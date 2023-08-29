<template>
  <div>
    <el-card shadow="never" class="border-0">
      <!-- 搜索 -->
      <Search :model="searchForm" @search="getData(currentPage, searchForm.name)" @reset="resetSearchForm">
        <SearchItem label="客户姓名">
          <el-input v-model="searchForm.name" placeholder="客户姓名" clearable></el-input>
        </SearchItem>
      </Search>
      <!-- 新增|刷新 -->
      <ListHeader layout="refresh" @refresh="getData">
        <el-button type="success" size="small" @click="handleCreate">赠送项目</el-button>
        <el-button type="danger" size="small" @click="handleMultiDelete">批量删除</el-button>
      </ListHeader>
      <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe
        style="width: 100%" v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column label="客户" width="200" align="center">
          <template #default="{ row }">
            <div>
              <el-avatar :size="40" :src="row?.account?.profile_image?.url">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
              <h6>昵称:{{ row?.account?.username }}</h6>
              <small>ID:{{ row?.account.id }}</small>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="100" align="center">
          <template #default="{ row }">
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
        <el-table-column label="赠送项目" width="150" align="center">
          <template #default="{ row }">
            {{ row?.project?.name }}
          </template>
        </el-table-column>
        <el-table-column label="是否完成" width="150" align="center">
        <template #default="{ row }">
                    <el-switch :modelValue="row.status" active-value="已完成" inactive-value="待完成"
                        :loading="row.statusLoading" 
                        @change="handleStatusChange($event, row)">
                    </el-switch>
                </template>
        </el-table-column>
        <el-table-column label="到期时间" width="300" align="center">
          <template #default="{ row }">
            {{ row?.day_of_expiry }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="100">
          <template #default="{ row }">
            <el-button class="px-1" type="primary" size="small" text
              @click="handleEdit(row)">
              修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex items-center justify-center mt-5">
        <el-pagination background layout="prev, pager ,next" :page-count="total" :current-page="currentPage"
          :page-size="limit" @current-change="getData" />
      </div>
      <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
          <el-form-item label="客户ID" prop="ud_account_zhanghu_2424ea">
            <el-input v-model="form.ud_account_zhanghu_2424ea" placeholder="客户ID"></el-input>
          </el-form-item>
          <el-form-item label="项目" prop="project_project">
            <el-select ref="InputRef" v-model="form.project_project" class="ml-1 w-20" size="small" placeholder='+项目'>
              <el-option v-for="item in goodAt" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否完成" prop="status">
            <el-switch disabled v-model="form.status" active-value="已完成" inactive-value="待完成">
            </el-switch>
          </el-form-item>
          <el-form-item label="到期时间" prop="day_of_expiry">
            <el-date-picker v-model="form.day_of_expiry" type="datetime" placeholder="选择日期时间"
              format="YYYY/MM/DD HH:mm:ss"  />
          </el-form-item>
        </el-form>
      </FormDrawer>
    </el-card>
    <InfoModal ref="InfoModalRef" :info="info" />
    <ChooseGoods ref="ChooseGoodsRef" />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
import ListHeader from "~/components/ListHeader.vue";
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";
import InfoModal from "./InfoModal.vue";
import FormDrawer from "~/components/FormDrawer.vue";
import { getGiveProjects,createGiveProjects ,updateStatus,deleteGiveProjects,updateGiveProjects} from "~/graphql/getProjects"
import ChooseGoods from "~/components/ChooseGoods.vue";
import { useInitTable, useInitForm } from '~/composables/useCommon.js'


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
  handleStatusChange,
  handleDelete,
  multiSelectionIds
} = useInitTable({
  searchForm: {
    name: ""
  },
  getList: getGiveProjects,
  delete: deleteGiveProjects,
  updateStatus:updateStatus
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
    ud_account_zhanghu_2424ea: null,
    project_project: null,
    status: "待完成",
    day_of_expiry: ""
  },
  getData,
  update: updateGiveProjects,
  create: createGiveProjects,
  currentPage
})

const InfoModalRef = ref(null)
const info = ref(null)
const openInfoModal = (row) => {
  info.value = row
  InfoModalRef.value.open()
}

const setdefault = (row) => {
  form.cases_cases = row.id;
  form.solution = row?.solution?.solution;
  form.status = row?.solution?.status;
}

const ChooseGoodsRef = ref(null)

const goodAt = [{ id: 1, name: '针灸' }, { id: 2, name: '艾灸' }, { id: 3, name: '推拿' }, { id: 4, name: '就诊' }]

</script>