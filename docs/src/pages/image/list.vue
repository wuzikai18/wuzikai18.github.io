<template>
    <div>
      <el-container class="bg-white rounded" :style="{ height: (h + 'px') }">
      
      <el-header class="image-header">
        <ListHeader @create="changeStatus" @refresh="getData">
        <el-button type="danger" size="small" @click="handleMultiDelete">批量删除</el-button>
      </ListHeader>
      </el-header>
      <el-container>
        <ImageAside ref="ImageAsideRef" />
        <el-main class="image-main" v-loading="loading">
        <div class="top p-3">
          <el-table ref="multipleTableRef" :data="tableData" stripe style="width: 150%" v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column label="ID" width="50">
          <template #default="{ row }">
            <div>
                <div class="flex text-sm">
                <div class="flex-1">
                    <!-- <small>预约项目：</small> -->
                    <p>{{ row.id }}</p>
                </div>
            </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="150" align="center">
          <template #default="{ row }">
            <div>
                <div class="flex text-sm">
                <div class="flex-1">
                    <p>{{ row.idx }}</p>
                </div>
            </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="图片" width="150">
          <template #default="{ row }">
            <div>
                <div class="flex text-sm">
                <div class="flex-1">
                  <el-image :src="row?.image?.url" style="width:60px;height:60px;"></el-image>
                </div>
            </div>
            </div>
          </template>
        </el-table-column> 
        <el-table-column label="链接" width="400" align="center">
          <template #default="{ row }">
            <div>
                <div class="flex text-sm">
                <div class="flex-1">
                    <p>{{ row.url }}</p>
                </div>
            </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="300">
          <template #default="{ row }">
            <div>
                <div class="flex-1">
                <div>
                    <!-- <p>预约时间：</p> -->
                    <small>{{ row.created_at}}</small>
                </div>
            </div>
            </div>
          </template>
          
        </el-table-column>
        
        <el-table-column  label="操作" align="center" fixed="right" min-width="150">
        <template #default="scope">
          <el-button  type="primary" size="small" text @click="updateStatus(scope.row)">修改</el-button>

          <el-popconfirm  title="是否要删除该轮播图？" confirmButtonText="确认" cancelButtonText="取消"
            @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button text type="primary" size="small">删除</el-button>
            </template> 
          </el-popconfirm>
          
        </template>
      </el-table-column>
        
      </el-table>
        </div>
        <div class="bottom">
          <el-pagination background layout="prev, pager ,next" :page-count="total" :current-page="currentPage"
          :page-size="limit" @current-change="getData" />
        </div>
      </el-main>
      </el-container>
    </el-container>
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="图片" prop="image_id">
          <UploadFile :status=status  @success="handleUploadSuccess" @insert="insertImage" @create="createNewImage" />
        </el-form-item>
        <el-form-item label="排序(idx)" prop="idx">
                    <el-input type="number" v-model="form.idx" placeholder="排序(idx)" style="width:50%;">
                    </el-input>
                    <small class="text-gray-400 flex">
                        该字段用于小程序端轮播图的顺序
                    </small>
                </el-form-item>
                <el-form-item label="链接" prop="url">
            <el-input type="textarea" rows="8" v-model="form.url" placeholder="请输入链接"></el-input>
          </el-form-item>
      </el-form>
    </FormDrawer>
    </div>
</template>
<script setup>
import { ref,onMounted } from "vue"
import ImageAside from "~/components/ImageAside.vue"
import ListHeader from "~/components/ListHeader.vue";
import UploadFile from "~/components/UploadFile.vue";
import FormDrawer from "~/components/FormDrawer.vue";

import {getImage,deleteImage,createImage,updateInsertImage} from "~/graphql/getImage"

import { useInitTable ,useInitForm} from '~/composables/useCommon.js'
const status = ref('')
const {
  multipleTableRef,
  handleMultiDelete,
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
  },
  getList: getImage,
  onGetListSuccess: (res) => {
    tableData.value = res.list.map(o => {
      o.bannersLoading = false
      o.contentLoading = false
      o.skusLoading = false
      return o
    })},
  delete: deleteImage,
  
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
    image_id:null,
    idx:null,
    url:""
  },
  getData,
  update: updateInsertImage,
  create: createImage,
  currentPage
})

const ExportExcelRef = ref(null)
const handleExportExcel = ()=>ExportExcelRef.value.open()


const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 44 - 40
const drawer = ref(false)

const changeStatus = () =>{
  status.value = 'create'
  handleCreate()
}
const updateStatus = (data) =>{
  status.value = 'update'
  handleEdit(data)
}
const handleUploadSuccess=()=>{
  getData()
}

const insertImage=(data)=>{
  form.image_id = data
}
const createNewImage=(data)=>{

}
</script>
<style>
.image-header{
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}

.image-main{
  position: relative;
}
.image-main .top{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-main .bottom{
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
.image-title{
  position: absolute;
  top: 122px;
  left: -1px;
  right: -1px;
  @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>