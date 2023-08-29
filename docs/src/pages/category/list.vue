<template>
    <el-card shadow="never" class="border-0">
        <ListHeader @create="handleCreate" @refresh="getData"/>
        <el-tree :data="tableData" :props="{ label:'title' }" v-loading="loading" node-key="id">
            <template #default="{ node, data }">
                <div class="custom-tree-node">
                    <span class="ml-auto">排序：{{data.idx}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span class="ml-auto">分类名：{{ data.title }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

                    <div class="ml-auto">

                        <el-button text type="primary" size="small" @click.stop="handleEdit(data)">修改</el-button>

                        <!-- <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(data.id)">
                            <template #reference>
                                <el-button text type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm> -->
                    </div>

                </div>
            </template>
        </el-tree>

        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="分类名称" prop="title">
                    <el-input v-model="form.title" placeholder="分类名称"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="idx">
                    <el-input v-model="form.idx" placeholder="排序" type="number"></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer>


    </el-card>
</template>
<script setup>
import { ref } from "vue"
import ListHeader from "~/components/ListHeader.vue"
import FormDrawer from "~/components/FormDrawer.vue"
import {getCategory,deleteCategory,createCategory,updateCategory} from "~/graphql/getCategory.js"

import {
    useInitTable,
    useInitForm
} from "~/composables/useCommon.js"

const currentPage = 1;
const {
    loading,
    tableData,
    getData,
    handleDelete,
} = useInitTable({
    getList:getCategory,
    delete:deleteCategory
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
    title:"",
    idx:null
  },
  rules: {
    title: [{
      required: true,
      message: '分类名称不能为空',
      trigger: 'blur'
    }],
    idx: [{
      required: true,
      message: '排序值不能为空',
      trigger: 'blur'
    }],
  },

  getData,
  update: updateCategory,
  create: createCategory,
  currentPage
})
</script>
<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
}
.el-tree-node__content {
    padding: 20px 0;
}
</style>