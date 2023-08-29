<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增|刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData"/>

    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column label="优惠券名称" width="350">
        <template #default="{ row }">
          <div class="border border-dashed py-2 px-4 rounded">
            <h5 class="font-bold text-md">{{ row.type+"  "+"满"+row.use_condition_value+"减"+row.value}}</h5>
            <small>{{ "领取后有效期"+row.days+"天" }}</small>
          </div> 
        </template>
      </el-table-column>
      <el-table-column prop="is_show" label="状态" >
        <template #default="{ row }">
                    <el-switch :modelValue="row.is_show" :active-value="true" :inactive-value="false"
                        :loading="row.statusLoading" 
                        @change="handleStatusChange($event, row)">
                    </el-switch>
                </template>
        </el-table-column>
      <el-table-column label="使用场景">
        <template #default="{ row }">
          {{ row.type == '商城专用' ? "商城专用" : "门店专用" }}
        </template>
      </el-table-column>
      <el-table-column prop="used" label="领取后有效期" align="center">
        <template #default="{ row }" >
          {{ row.days+'天' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button  type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>

          <el-popconfirm  title="是否要删除该优惠券？" confirmButtonText="确认" cancelButtonText="取消"
            @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button text type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
          
        </template>
      </el-table-column>
    </el-table>
    <div class="flex items-center justify-center mt-5">
      <el-pagination background layout="prev, pager ,next" :page-count="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
    </div>
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="商城专用">商城专用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="面值" prop="value">
          <el-input v-model="form.value" placeholder="面值" style="width: 50%;" type="number">
          </el-input>
        </el-form-item>
        <el-form-item label="使用条件" prop="min_price">
          <el-input v-model="form.use_condition_value" placeholder="最低使用价格" type="number" style="width: 50%;"></el-input>
        </el-form-item>
        <el-form-item label="使用期限" prop="days">
          <el-input v-model="form.days" placeholder="领取后使用期限" step="1" type="number" style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="状态" prop="is_show">
                    <el-switch v-model="form.is_show" :active-value="true" :inactive-value="false">
                    </el-switch>
                </el-form-item>
      </el-form>
    </FormDrawer>

  </el-card>
</template>
<script setup>
import { computed } from "vue"
import ListHeader from "~/components/ListHeader.vue";
import FormDrawer from "~/components/FormDrawer.vue";

import {getCoupon,updateStatus,deleteCoupon,createCoupon,updateCoupon} from '~/graphql/getCoupon'
import { useInitTable, useInitForm } from '~/composables/useCommon.js'


const {
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleStatusChange
} = useInitTable({
  getList: getCoupon,
  delete: deleteCoupon,
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
    type:"",
    value:null,
    use_condition_value:null,
    days:null,
    is_show:true,
    store_store:1
  },rules: {
    type: [{
      required: true,
      message: '优惠券类型不能为空',
      trigger: 'blur'
    }],
    value: [{
      required: true,
      message: '优惠券面额不能为空',
      trigger: 'blur'
    }],
    use_condition_value: [{
      required: true,
      message: '使用条件不能为空',
      trigger: 'blur'
    }],
    days: [{
      required: true,
      message: '有效期不能为空',
      trigger: 'blur'
    }],
    is_show:[
    {
      required: true,
      message: '状态不能为空',
      trigger: 'blur'
    }]
  },
  getData,
  update: updateCoupon,
  create: createCoupon,
  currentPage
})
</script>
<style scoped>
.active {
  @apply border-rose-200 bg-rose-50 text-red-400;
}

.inactive {
  @apply border-gray-200 bg-gray-50 text-gray-400;
}
</style>