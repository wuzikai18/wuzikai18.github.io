<template>
  <div>
    <el-card shadow="never" class="border-0">
      <!-- 搜索 -->
      <Search :model="searchForm" @search="getData(currentPage, searchForm.username)" @reset="resetSearchForm">
        <SearchItem label="用户昵称">
          <el-input v-model="searchForm.username" placeholder="用户昵称" clearable></el-input>
        </SearchItem>
      </Search>
      <!-- 新增|刷新 -->
      <ListHeader layout="refresh" @refresh="getData">
        <el-button type="danger" size="small" @click="handleMultiDelete">批量删除</el-button>
      </ListHeader>

      <el-table :data="tableData" @selection-change="handleSelectionChange" stripe style="width: 100%"
        v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column label="会员" width="200" align="center">
          <template #default="{ row }">
            <div>
              <el-avatar :size="40" :src="row.account_id.profile_image.url">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
              <h6>{{ row.account_id.username }}</h6>
              <small>ID:{{ row.account_id.id }}</small>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="100" align="center">
          <template #default="{ row }">
            <h6>{{ row.account_id?.ud_personal_cec0ba?.name }}</h6>
          </template>
        </el-table-column>
        <el-table-column label="性别" width="100" align="center">
          <template #default="{ row }">

            <h6>{{ row.account_id?.ud_personal_cec0ba?.gender }}</h6>

          </template>
        </el-table-column>
        <el-table-column label="注册手机" width="150" align="center">
          <template #default="{ row }">
            <h6>{{ row.account_id?.ud_personal_cec0ba?.phone }}</h6>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" align="center" width="150">
          <template #default="{ row }">
            <p> {{ row.created_at.slice(0, 10) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="地址" align="center" width="250">
          <template #default="{ row }">
            <p> {{ row.account_id?.ud_personal_cec0ba?.address }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="消费金额" align="center" width="150">
          <template #default="{ row }">
            <p> {{ row.consumption + '（元）' }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="拉新人数" align="center" width="150">
          <template #default="{ row }">
            <p> {{ row.account_id.invitees.length + '（人）' }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="会员等级" align="center" width="150">
          <template #default="{ row }">
            {{ row.level?.level_name || "-" }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="添加核销管理" align="center">
          <template #default="{ row }">
            <el-switch :modelValue="row?.account_id.is_write" :active-value="true" :inactive-value="false"
              :loading="row.statusLoading" @change="handleStatusChange($event, row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="150" align="center">
          <template #default="scope">
            <div>
              <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex items-center justify-center mt-5">
        <el-pagination background layout="prev, pager ,next" :page-count="total" :current-page="currentPage"
          :page-size="limit" @current-change="getData" />
      </div>
      <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
          <el-form-item label="设置会员" prop="level_member_level">
            <el-select v-model="form.level_member_level" placeholder="请选择">
              <el-option v-for="item in tabbars" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </FormDrawer>
    </el-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
import ListHeader from "~/components/ListHeader.vue";
import FormDrawer from "~/components/FormDrawer.vue";
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";
import {
  showModal,
  showPrompt,
  toast
} from "~/composables/util"
import { getMember, deleteMember, updateStatus, updateMember } from "~/graphql/getMember"
import { getLevel } from "~/graphql/getLevel"

import { useInitTable, useInitForm } from '~/composables/useCommon.js'

const tabbars = [{}]
onMounted(() => {
  getLevel(null, null).then((res) => {
    res.list = res.list.map((o) => {
      return {
        id: o.id,
        name: o.level_name
      }
    })
    for (let i = 0; i < res.list.length; i++) {
      tabbars[i] = res.list[i]
    }
    //  console.log(tabbars)
  })
})
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
    username: "",
    phone: "",
  },
  getList: getMember,
  delete: deleteMember,
  updateStatus: updateStatus

})

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
    level_member_level: null,
    consumption: null,
    rechange: null
  },
  getData,
  update: updateMember,
  // create: createCoupon,
  currentPage
})
</script>