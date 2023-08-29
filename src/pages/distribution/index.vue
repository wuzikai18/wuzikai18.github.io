<template>
  <div>
    <el-card shadow="never" class="border-0">
      <!-- 搜索 -->
      <Search :model="searchForm" @search="getData(currentPage,searchForm.name)" @reset="resetSearchForm">
        <SearchItem label="客户姓名">
          <el-input v-model="searchForm.name" placeholder="客户姓名" clearable></el-input>
        </SearchItem>
      </Search>
      <!-- 新增|刷新 -->
      <ListHeader layout="refresh" @refresh="getData">
        <el-button type="danger" size="small" @click="handleMultiDelete">批量删除</el-button>
      </ListHeader>
      <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column label="客户" width="200" align="center">
        <template #default="{ row }">
              <div>
                <el-avatar :size="40" :src="row?.account?.profile_image?.url">
                <img
                  src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                />
              </el-avatar>
                <h6>{{ row?.account?.username }}</h6>
                <small>ID:{{ row?.account.id }}</small>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="100" align="center">
        <template #default="{ row }" >
                <h6>{{ row?.account?.ud_personal_cec0ba?.name }}</h6>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="100" align="center">
        <template #default="{ row }">
                <h6>{{ row?.account?.ud_personal_cec0ba?.gender }}</h6>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="100" align="center">
        <template #default="{ row }">
                <h6>{{ row?.account?.ud_personal_cec0ba?.age }}</h6>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="150" align="center">
        <template #default="{ row }">
                <h6>{{ row?.account?.ud_personal_cec0ba?.phone }}</h6>
        </template>
      </el-table-column>
      <el-table-column label="病例描述" width="400" align="left">
          <template #default="{ row }">
            {{ row?.description }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" min-width="150">
          <template #default="{ row }">
           <el-button class="px-1" type="primary" size="small" text
           @click="openInfoModal(row)">病例详情</el-button>
           <el-button class="px-1" type="primary" size="small" text
           @click="((row.solution?.solution || row.solution?.status) ? handleEdit(row) : handleCreate() );setdefault(row)">{{row.solution ? '已回复' : '回复方案'}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex items-center justify-center mt-5">
        <el-pagination background layout="prev, pager ,next" :page-count="total" :current-page="currentPage"
          :page-size="limit" @current-change="getData"  />
      </div>
      <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">     
        <el-form-item  label="病例id" prop="cases_cases">
          <el-input disabled v-model="form.cases_cases" placeholder="病例id" type="number" style="width: 50%;"></el-input>
        </el-form-item>
        <el-form-item label="方案" prop="solution">
          <el-input v-model="form.solution" :rows="6" placeholder="方案" style="width: 100%;" type="textarea">
          </el-input>
        </el-form-item>
        <el-form-item label="是否可见" prop="status">
                    <el-switch v-model="form.status" :active-value="true" :inactive-value="false">
                    </el-switch>
                </el-form-item>
      </el-form>
    </FormDrawer>
    </el-card>
    <InfoModal ref="InfoModalRef" :info="info"/>

  </div>
</template>
<script setup>
import { ref,onMounted } from "vue"
import ListHeader from "~/components/ListHeader.vue";
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";
import InfoModal from "./InfoModal.vue";
import FormDrawer from "~/components/FormDrawer.vue";
import {getCases,deleteCases,createSolution,updateSolution} from "~/graphql/getCases"

import { useInitTable ,useInitForm} from '~/composables/useCommon.js'


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
    name: ""
  },
  getList: getCases,
  onGetListSuccess: (res) => {
    tableData.value = res.list.map(o => {
      o.bannersLoading = false
      o.contentLoading = false
      o.skusLoading = false
      return o
    })},
  delete: deleteCases,
  
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
    cases_cases:null,
    solution:'',
    status:false,
  },
  getData,
  update: updateSolution,
  create: createSolution,
  rules: {
    solution: [{
      required: true,
      message: '回复方案不能为空',
      trigger: 'blur'
    }]
  },
  currentPage
})

const InfoModalRef = ref(null)
const info = ref(null)
const openInfoModal = (row)=>{
  info.value = row
  InfoModalRef.value.open()
}

const setdefault = (row) =>{
  form.cases_cases = row.id;
  form.solution = row?.solution?.solution;
  form.status = row?.solution?.status ? row?.solution?.status : false;
}
</script>