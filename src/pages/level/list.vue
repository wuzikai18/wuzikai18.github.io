<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增|刷新 -->
        <!-- <ListHeader @refresh="getData" /> -->

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="level_name" label="会员等级" />
            <el-table-column prop="condition" label="需拉新人数" align="center" >
                <template #default="{ row }">
                    {{row.condition+"(人)"}}
                </template>
            </el-table-column>
            <el-table-column prop="discount" label="消费返利" align="center" >
                <template #default="{ row }">
                    {{row.discount+"%"}}
                </template>
            </el-table-column>
            <el-table-column prop="level" label="等级序号" align="center" />
            <el-table-column prop="status" label="状态" width="120">
                <template #default="{ row }">
                    <el-switch :modelValue="row.status" :active-value="true" :inactive-value="false"
                        :loading="row.statusLoading" :disabled="row.super == 1"
                        @change="handleStatusChange($event, row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>

                    <!-- <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消"
                        @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button text type="primary" size="small">删除</el-button>
                        </template>
                    </el-popconfirm> -->
                </template>
            </el-table-column>
        </el-table>

        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev, pager ,next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>

        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="等级名称" prop="level_name">
                    <el-input v-model="form.level_name" placeholder="等级名称"></el-input>
                </el-form-item>
                <el-form-item label="等级权重" prop="level">
                    <el-input v-model="form.level" placeholder="等级权重"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch v-model="form.status" :active-value="true" :inactive-value="false">
                    </el-switch>
                </el-form-item>
                <el-form-item label="升级条件">
                    <div>
                        <small class="text-xs mr-2">累计拉新满</small>
                        <el-input type="number" v-model="form.condition" placeholder="累计拉新" style="width:50%;">
                            <template #append>人</template>
                        </el-input>
                        <small class="text-gray-400 flex">
                            设置会员等级所需要的累计拉新必须大于等于0,单位：人
                        </small>
                    </div>
                </el-form-item>
                <el-form-item label="折扣率(%)" prop="discount">
                    <el-input type="number" v-model="form.discount" placeholder="折扣率(%)" style="width:50%;">
                        <template #append>%</template>
                    </el-input>
                    <small class="text-gray-400 flex">
                        折扣率单位为百分比，如输入90，表示该会员等级的用户可以以商品原价的90%购买
                    </small>
                </el-form-item>
            </el-form>
        </FormDrawer>


    </el-card>
</template>
<script setup>
import ListHeader from "~/components/ListHeader.vue";
import FormDrawer from "~/components/FormDrawer.vue";

import {getLevel,updateStatus,deleteLevel,createLevel,updateLevel} from "~/graphql/getLevel"


import { useInitTable, useInitForm } from '~/composables/useCommon.js'

// const tableData = ref([])



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
    getList: getLevel,
    delete: deleteLevel,
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
    handleEdit
} = useInitForm({
    form: {
        level_name: "",
        level: "",
        status: true,
        condition: 0,
        discount: 0,
        
    },
    rules: {
        level_name: [{
            required: true,
            message: '会员等级名称不能为空',
            trigger: 'blur'
        }],
    },
    getData,
    update: updateLevel,
    create: createLevel,
    currentPage
})
</script>