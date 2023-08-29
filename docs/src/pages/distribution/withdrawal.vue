<template>
    <div>
      <el-card shadow="never" class="border-0">
        <!-- 搜索 -->
        
  
        <!-- 新增|刷新 -->
        <ListHeader layout="refresh" @refresh="getData(currentPage,searchForm.trade_id)">
          
        </ListHeader>
  
        <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe style="width: 100%" v-loading="loading">
          <el-table-column type="selection" width="55" />
          <el-table-column align="left" label="申请人" width="100">
            <template #default="{ row }">
              <p>{{ row?.user_id?.username }}</p>
            </template>
          </el-table-column> 
          <el-table-column align="left" label="银行卡号" width="200">
            <template #default="{ row }">
              <p>{{ row?.bank_card_number}}</p>
            </template>
          </el-table-column>
          <el-table-column align="left" label="手机号" width="150">
            <template #default="{ row }">
              <p>{{ row?.phone}}</p>
            </template>
          </el-table-column>
          <el-table-column align="left" label="申请金额" width="150">
            <template #default="{ row }">
              <p>{{ row?.amount_requested+"元"}}</p>
            </template>
          </el-table-column>
          <el-table-column label="是否转账" align="center" fixed="right" min-width="150">
          
          <template #default="{ row }">
              <el-switch v-if="row?.ud_status_b60ec8 != '已拒绝'" :modelValue="row?.ud_status_b60ec8" active-value="已通过" inactive-value="待审核"
                @change="handleStatusChange($event, row)">
              </el-switch>
                <el-tag v-if="row?.ud_status_b60ec8 == '已拒绝'" type="error" size="small">已拒绝</el-tag>
          </template>
  </el-table-column>
  
            <el-table-column label="操作" align="left" fixed="right" min-width="150">
            <template #default="scope">
              <div>
                <el-button class="px-1" type="primary" size="small" text @click="handleEdit(scope.row)">拒绝申请</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
  
        <div class="flex items-center justify-center mt-5">
          <el-pagination background layout="prev, pager ,next" :page-count="total" :current-page="currentPage"
            :page-size="limit" @current-change="getData" />
        </div>
        <FormDrawer destroyOnClose ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
          <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
            <el-form-item label="拒绝理由" prop="ud_review_comment_5b8fec">
              <el-input type="textarea" rows="8" v-model="form.ud_review_comment_5b8fec" placeholder="请输入拒绝理由"></el-input>
            </el-form-item>
          </el-form>
        </FormDrawer>
        
      </el-card>
  
  
  
    </div>
  </template>
  <script setup>
  import { ref,onMounted } from "vue"
  import ListHeader from "~/components/ListHeader.vue";
  import FormDrawer from "~/components/FormDrawer.vue";
  import Search from "~/components/Search.vue";
  import SearchItem from "~/components/SearchItem.vue";
  import CryptoJS from 'crypto-js'
  import {
    showModal,
    showPrompt,
    toast
  } from "~/composables/util"
  import {getAppointment,deleteAppointments,updateStatus,updateFlie,updateAdvise} from "~/graphql/getWithdrawal"
  import {getStaff} from "~/graphql/getStaff"
  import {getstore} from "~/graphql/getstore"
  import {
    refundOrder
  } from "~/api/order"
  import { updateFile } from '~/graphql/getImage'
  import { useInitTable,useInitForm } from '~/composables/useCommon.js'
  
  const storeName = ref([]);
  onMounted(async()=>{
   const storeRes = await getstore()
   storeName.value = storeRes.list.map((o)=>{
       return {
        id:o.id,
        name:o.name
       }
      });
      console.log(storeName,'storeName')
  })

//   const handleStatusChange = (status, row) => {
//     console.log('handleStatusChange')
//         updateStatus(status,row.id,row.amount_requested,row.ud_user_id_zhanghu_667156)
//             .then(res => {
//                 toast("修改状态成功")
//                 row.ud_status_b60ec8 = status
//             })
//             .finally(() => {
//                 getData()
//             })
//     }
  
  const {
    handleSelectionChange,
    multipleTableRef,
    handleMultiDelete,
    searchForm,
    resetSearchForm,
    handleStatusChange,
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
      store_store: null,
    },
    getList: getAppointment,
    onGetListSuccess: (res) => {
      tableData.value = res.list.map(o => {
        o.bannersLoading = false
        o.contentLoading = false
        o.skusLoading = false
        return o
      })},
    delete: deleteAppointments,
    updateStatus:updateStatus
  });
  const {
    formDrawerRef,
    formRef,
    form,
    rules,
    drawerTitle,
    handleSubmit,
    handleCreate,
    handleEdit,
  } = useInitForm({
    form: {
      ud_review_comment_5b8fec: '',
    },
    rules: {
      ud_review_comment_5b8fec: [{
        required: true,
        message: '拒绝理由不能为空',
        trigger: 'blur'
      }]
    },
    getData,
    update: updateAdvise,
    currentPage
  })
  
  
  
  const tabbars = [{
    key: "",
    name: "全部"
  }]
  
  const ExportExcelRef = ref(null)
  const handleExportExcel = ()=>ExportExcelRef.value.open();
  
  const selectId = ref(null)
  const toggleRow = (rowId)=>{
     console.log(rowId,"rowid")
     selectId.value = rowId;
  }
  
  const contentType2 = ref('')
  const md52 = ref('')
  const typeName2 = ref('')
  const fileId = ref(null);
  
  const onChange2 = (file) => {
    typeName2.value = file.name.split('.').pop().toLowerCase();
    contentType2.value = file.raw.type
    md5Base64(file.raw).then((res) => {
      md52.value = res
      updateFile(res,file.name, typeName2.value.toUpperCase()).then((res) => {
        fileId.value = res.data.filePresignedUrl.fileId
        var myHeaders = new Headers();
        myHeaders.append("content-md5", md52.value);
        myHeaders.append("Content-Type", contentType2.value);
        var requestOptions = {
          headers: myHeaders,
          method: 'PUT',
          body: file.raw
        };
        fetch(res.data.filePresignedUrl.uploadUrl, requestOptions).then(() => {
            updateFlie(fileId.value,selectId.value).then(()=>{
              toast("上传成功！")
              getData();
            })
            
        }).catch((err) => {
        })
      })
    })
  }
  
  
  const md5Base64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        if (e?.target?.result) {
          const wordArray = CryptoJS.lib.WordArray.create(e?.target?.result);
          const hash = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(wordArray));
          resolve(hash);
        } else {
          reject('');
        }
      };
      reader.onerror = () => {
        reject('');
      };
      reader.readAsArrayBuffer(file);
    });
  }
  
  </script>
  <style>
  .choose-image-btn {
    @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
  }
  </style>