<template>
  <div>
    <el-card shadow="never" class="border-0">
      <!-- 搜索 -->
      <Search :model="searchForm" @search="getData(currentPage,'',searchForm.store_store)" @reset="resetSearchForm">
        <SearchItem label="选择医院">
          <!-- <el-input  v-model="searchForm.store_store" placeholder="选择医院" clearable ></el-input> -->
          <el-select v-model="searchForm.store_store" placeholder="请选择医院">
                    <el-option v-for="item in storeName"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
        </SearchItem>
      </Search>

      <!-- 新增|刷新 -->
      <ListHeader layout="refresh,download" @refresh="getData(currentPage,searchForm.trade_id)" @download="handleExportExcel">
        <el-button type="danger" size="small" @click="handleMultiDelete">批量删除</el-button>
      </ListHeader>

      <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column label="项目" width="150">
          <template #default="{ row }">
            <div>
                <div class="flex text-sm">
                <div class="flex-1">
                    <!-- <small>预约项目：</small> -->
                    <p>{{ row?.project?.project?.name }}</p>
                </div>
            </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="预约日期" width="150">
          <template #default="{ row }">
            <div>
                <div class="flex text-sm">
                <div>
                    <!-- <p>预约时间：</p> -->
                    <small>{{ row?.date }}</small>
                </div>
            </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="预约人" width="100">
          <template #default="{ row }">
            <p>{{ row?.personal ? row?.personal?.name : row?.family?.name}}</p>
            <!-- <small>(用户ID:{{ row.id }})</small> -->
          </template>
        </el-table-column>  
        <el-table-column align="center" label="年龄" width="75">
          <template #default="{ row }">
            <p>{{ row?.personal ? row?.personal?.age : row?.family?.age}}</p>
            <!-- <small>(用户ID:{{ row.id }})</small> -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="性别" width="75">
          <template #default="{ row }">
            <p>{{ row?.personal ? row?.personal?.gender : row?.family?.gender}}</p>
            <!-- <small>(用户ID:{{ row.id }})</small> -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="身份证号" width="200">
          <template #default="{ row }">
            <p>{{ row?.personal ? row?.personal?.idcard_number : row?.family?.idcard_number}}</p>
            <!-- <small>(用户ID:{{ row.id }})</small> -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="手机号" width="150">
          <template #default="{ row }">
            <p>{{ row?.personal ? row?.personal?.phone : row?.family?.phone}}</p>
            <!-- <small>(用户ID:{{ row.id }})</small> -->
          </template>
        </el-table-column>
        <el-table-column label="预约信息" width="300" align="left">
          <template #default="{ row }">
            <div>
                <p>医院地址：{{row?.project?.staff?.store?.name}}</p>
            </div>
            <div>
                 <p>套餐分类：{{row?.project?.staff?.name}}</p>
            </div>
            <div>
                <p>套餐名称：{{row?.project?.project?.name}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="支付状态" align="center">
          <template #default="{ row }">
            <div>
                <el-tag v-if="row?.payment == '已支付'" type="success" size="small">已支付</el-tag>
                <el-tag v-else-if="row?.payment == '待支付'" type="info" size="small">待支付</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="体检状态" align="center" fixed="right" min-width="150">
          
                <template #default="{ row }">
                    <el-switch :modelValue="row?.status" active-value="已就诊" inactive-value="待就诊"
                      @change="handleStatusChange($event, row)">
                    </el-switch>
                </template>
        </el-table-column>
        <el-table-column  label="查看体检报告" align="center" fixed="right" min-width="150">
          
          <template #default="{ row }">
              <a v-show="row?.ud_reportfile_720497?.url ? true : false" :href="row?.ud_reportfile_720497?.url" target="_blank">查看体检报告</a>
              
          </template>
          
       </el-table-column>
       <el-table-column  label="上传体检报告" align="center" fixed="right" min-width="150">
       <template #default="{row}">
            <el-upload
    v-model="row.ud_reportfile_720497_id"
    class="upload-demo"
    action
    :on-change="onChange2"
  >
    <el-button type="primary" @click="toggleRow(row.id)">上传</el-button>
    <template #tip>
      <div class="el-upload__tip">
        请上传PDF文件
      </div>
    </template>
  </el-upload>
            </template>
          </el-table-column>

          <el-table-column label="上传医生建议" align="center" fixed="right" min-width="150">
          <template #default="scope">
            <div>
              <el-button class="px-1" type="primary" size="small" text @click="handleEdit(scope.row)">上传</el-button>
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
          <el-form-item label="医生建议" prop="advise">
            <el-input type="textarea" rows="8" v-model="form.advise" placeholder="请输入医生建议"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
          <el-form-item label="体检结果" prop="result">
            <el-input type="textarea" rows="8" v-model="form.result" placeholder="请输入体检结果"></el-input>
          </el-form-item>
        </el-form>
      </FormDrawer>
      
    </el-card>

    <ExportExcel :tabs="tabs" :storeName="storeName" ref="ExportExcelRef" />


  </div>
</template>
<script setup>
import { ref,onMounted } from "vue"
import ListHeader from "~/components/ListHeader.vue";
import FormDrawer from "~/components/FormDrawer.vue";
import ExportExcel from "./ExportExcel.vue"
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";
import CryptoJS from 'crypto-js'
import {
  showModal,
  showPrompt,
  toast
} from "~/composables/util"
import {getAppointment,deleteAppointments,updateStatus,updateFlie,updateAdvise} from "~/graphql/appointment"
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

const {
  handleSelectionChange,
  multipleTableRef,
  handleMultiDelete,
  handleStatusChange,
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
    advise: '',
    result: ''
  },
  rules: {
    advise: [{
      required: true,
      message: '医生建议不能为空',
      trigger: 'blur'
    }],
    result: [{
      required: true,
      message: '体检结果不能为空',
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