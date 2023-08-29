<template>
  <div>
    <el-tabs v-model="searchForm.tab" @tab-change="getData(1,searchForm.trade_id,searchForm.tab)">
      <el-tab-pane :label="item.name" :name="item.key" v-for="(item, index) in tabbars" :key="index"></el-tab-pane>
    </el-tabs>

    <el-card shadow="never" class="border-0">
      <!-- 搜索 -->
      <Search :model="searchForm" @search="getData(currentPage,searchForm.trade_id)" @reset="resetSearchForm">
        <SearchItem label="订单编号">
          <el-input v-model="searchForm.trade_id" placeholder="订单编号" clearable></el-input>
        </SearchItem>
      </Search>

      <!-- 新增|刷新 -->
      <ListHeader layout="refresh,download" @refresh="getData" @download="handleExportExcel">
        <el-button type="danger" size="small" @click="handleMultiDelete">批量删除</el-button>
      </ListHeader>

      <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column label="订单信息" width="400">
          <template #default="{ row }">
            <div>
                <div class="flex text-sm">
                <div class="flex-1">
                    <p>订单号：</p>
                    <small>{{ row.trade_id }}</small>
                </div>
                <div>
                    <p>下单时间：</p>
                    <small>{{ row.shipping_time }}</small>
                </div>
            </div>
            <div class="flex py-2" v-for="(item,index) in row?.order_items" :key="index">
                <el-image :src="item.goods_item ? item.goods_item.cover : ''" fit="cover" :lazy="true" style="width: 30px;height: 30px;"></el-image>
                <p class="text-blue-500 ml-2">
                    {{ item.goods_item ? item.goods_item.title : '商品已被删除' }}
                </p>
            </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实际付款" width="120" prop="final_payment" align="center" />
        <el-table-column align="center" label="买家" width="250">
          <template #default="{ row }">
            <p>{{ row.buyer || row.buyer }}</p>
            <small>(用户ID：{{ row?.account?.id }})</small>
          </template>
        </el-table-column>  
        <el-table-column label="交易状态" width="170" align="center">
          <template #default="{ row }">
            <div>
                付款状态：
                <el-tag :type="((row.trade_status == '待支付') || (row.trade_status == '已关闭')) ? 'info' : 'success'" size="small">{{ ((row.trade_status == '待支付') || (row.trade_status == '已关闭')) ? '待支付' : '已支付' }}</el-tag>
            </div>
            <div>
                发货状态：
                <el-tag :type="((row.trade_status == '已收货') || (row.trade_status == '未完成') || (row.trade_status == '已完成') || (row.trade_status == '待收货')) ? 'success' : 'info'" size="small">{{ ((row.trade_status == '已收货') || (row.trade_status == '未完成') || (row.trade_status == '已完成') || (row.trade_status == '待收货')) ? '已发货' : '待发货' }}</el-tag>
            </div>
            <div>
                收货状态：
                <el-tag :type="((row.trade_status == '已收货') || (row.trade_status == '未完成') || (row.trade_status == '已完成')) ? 'success' : 'info'" size="small">{{ ((row.trade_status == '已收货') || (row.trade_status == '未完成') || (row.trade_status == '已完成')) ? '已收货' : '待收货' }}</el-tag>
            </div>
            <div>
                订单状态：
                <el-tag :type="row.trade_status == '已完成' ? 'success' : 'info'" size="small">{{ row.trade_status == '已完成' ? '已完成' : '未完成' }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
           <el-button class="px-1" type="primary" size="small" text
           @click="openInfoModal(row)">订单详情</el-button>
           <el-button v-if="row.trade_status === '待发货'" class="px-1" type="primary" size="small" @click="handleEdit(row)" text >订单发货</el-button>
           <el-button v-if="row.trade_status === '退款中'" class="px-1" type="primary" size="small" text @click="handleRefund(row.id,row.transactionid_payment_transaction,1)">同意退款</el-button>
           <el-button v-if="row.trade_status === '退款中'" class="px-1" type="primary" size="small" text @click="handleRefund(row.id,0)">拒绝退款</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex items-center justify-center mt-5">
        <el-pagination background layout="prev, pager ,next" :page-count="total" :current-page="currentPage"
          :page-size="limit" @current-change="getData"  />
      </div>
      <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
          <el-form-item label="快递公司" prop="express">
            <el-input v-model="form.express" placeholder="快递公司"></el-input>
          </el-form-item>
          <el-form-item label="快递单号" prop="way_bill">
            <el-input v-model="form.way_bill" placeholder="快递单号"></el-input>
          </el-form-item>
          <el-form-item label="发货时间" prop="end_time">
            <el-date-picker v-model="form.end_time" type="datetime" placeholder="选择日期时间"
              format="YYYY/MM/DD HH:mm:ss"  />
          </el-form-item>
        </el-form>
      </FormDrawer>
    </el-card>

    <ExportExcel :tabs="tabbars" ref="ExportExcelRef" />

    <InfoModal ref="InfoModalRef" :info="info"/>

  </div>
</template>
<script setup>
import { ref } from "vue"
import ListHeader from "~/components/ListHeader.vue";
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";
import ExportExcel from "./ExportExcel.vue"
import InfoModal from "./InfoModal.vue"
import FormDrawer from "~/components/FormDrawer.vue";
import {
  showModal,
  showPrompt,
  toast
} from "~/composables/util"
import {getOrder,deleteOrders,updateOrder,searchOrder,refund,updatePaymentTransaction,updateRefundOrder,refuseRefund} from "~/graphql/getOrder"

import { useInitTable,useInitForm } from '~/composables/useCommon.js'


const {
  handleSelectionChange,
  multipleTableRef,
  handleMultiDelete,

  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  multiSelectionIds
} = useInitTable({
  searchForm: {
    trade_id: "",
    tab: "全部",
  },
  getList: getOrder,
  onGetListSuccess: (res) => {
    tableData.value = res.list.map(o => {
      o.bannersLoading = false
      o.contentLoading = false
      o.skusLoading = false
      return o
    })},
  delete: deleteOrders,
  
})
const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit
} = useInitForm({
  form: {
    way_bill: null,
    express: "",
    end_time:null
  },
  getData,
  update: updateOrder,
  // create: createGiveProjects,
  currentPage
})

const tabbars = [{
  key: "",
  name: "全部"
}, {
  key: "待支付",
  name: "待支付"
}, {
  key: "待发货",
  name: "待发货"
}, {
  key: "待收货",
  name: "待收货"
}, {
  key: "已完成",
  name: "已完成"
}, {
  key: "已关闭",
  name: "已关闭"
}, {
  key: "退款中",
  name: "退款中"
}]

const ExportExcelRef = ref(null)
const handleExportExcel = ()=>ExportExcelRef.value.open()

const InfoModalRef = ref(null)
const info = ref(null)
const openInfoModal = (row)=>{
  info.value = row
  InfoModalRef.value.open()
}

//退款处理
const handleRefund = (id,transactionId,agree)=>{
  (agree ? showModal("是否要同意该订单退款?") : showPrompt("请输入拒绝的理由"))
  .then(({ value })=>{
    let data = { agree }
    if(!agree){
      updateRefundOrder(id,"待发货","退款失败").then(()=>{    
            refuseRefund(id,value).then(()=>{
              getData()
              toast("拒绝退款成功")
            })
          })
    }else{
      searchOrder(transactionId).then(res=>{
      refund(res.data.fz_payment[0].id).then((result)=>{
        if(result.data?.refund == true && result.data != null){
        updatePaymentTransaction(transactionId).then(()=>{
          updateRefundOrder(id,"已关闭","退款成功").then(()=>{
            getData()
            toast("退款成功")
          })
        })
      }else{
        getData()
        const msg = JSON.parse(result.errors[0].message).err_code_des;
        toast(msg,"error")
        }
      })
    })
    }
  })
}
</script>