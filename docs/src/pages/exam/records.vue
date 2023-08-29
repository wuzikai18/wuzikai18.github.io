<template>
    <div>
        <el-card shadow="never" class="border-0">
            <!-- 搜索 -->
            

            <!-- 新增|刷新 -->
            <ListHeader layout="refresh," @refresh="getData(currentPage, searchForm.trade_id)"
                >
            </ListHeader>

            <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe
                style="width: 100%" v-loading="loading">
                <el-table-column type="selection" width="55" />
                <el-table-column label="测评名称" width="150">
                    <template #default="{ row }">
                        <div>
                            <div class="flex text-sm">
                                <div class="flex-1">
                                    <p>{{ row?.test?.title }}</p>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="测评日期" width="150">
                    <template #default="{ row }">
                        <div>
                            <div class="flex text-sm">
                                <div>
                                    <!-- <p>预约时间：</p> -->
                                    <small>{{ row?.updated_at.slice(0, 10) }}</small>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="用户信息" width="300" align="left">
                    <template #default="{ row }">
                        <div>
                            <p>用户名：{{ row?.user_id?.username }}</p>
                        </div>
                        <div>
                            <p>用户id：{{ row?.user_id?.id }}</p>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center" fixed="right" min-width="150">
                    <template #default="scope">
                        <div>
                            <el-button class="px-1" type="primary" size="small" text
                                @click="cheakAnswer(scope.row)">查看答题情况</el-button>
                            <el-button class="px-1" type="primary" size="small" text
                                @click="handleEdit(scope.row)">上传</el-button>
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
                    <el-form-item label="测评结果" prop="result">
                        <el-input type="textarea" rows="8" v-model="form.result" placeholder="请输入测评结果"></el-input>
                    </el-form-item>
                </el-form>
            </FormDrawer>

            <el-drawer v-model="drawer" title="答题详情" :with-header="true">
                <span class="mb-5" v-for="(item,index) in answer_records.value" :key="item.question">
                {{ (index+1)+"."+item.question }}
                <p>所选选项：{{ item.options?.join() }}</p>
                </span>
                
            </el-drawer>


        </el-card>



    </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue"
import ListHeader from "~/components/ListHeader.vue";
import FormDrawer from "~/components/FormDrawer.vue";
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";
import { getAppointment, deleteAppointments, updateStatus, updateAdvise } from "~/graphql/getExamRecord"

import { getstore } from "~/graphql/getstore"
import { useInitTable, useInitForm } from '~/composables/useCommon.js'

const drawer = ref(false);
const answer_records = reactive({});
const cheakAnswer = (row) => {
    drawer.value = true;
    
    const result = [];

    row.answer_records.forEach(item => {
  const questionTitle = item.option.question.title;
  const optionTitle = item.option.title;

  const existingQuestion = result.find(obj => obj.question === questionTitle);

  if (existingQuestion) {
    existingQuestion.options.push(optionTitle);
  } else {
    result.push({
      question: questionTitle,
      options: [optionTitle]
    });
  }
});

answer_records.value = result;
    console.log(answer_records.value);
}
const storeName = ref([]);
onMounted(async () => {
    const storeRes = await getstore()
    storeName.value = storeRes.list.map((o) => {
        return {
            id: o.id,
            name: o.name
        }
    });
    console.log(storeName, 'storeName')
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
        })
    },
    delete: deleteAppointments,
    updateStatus: updateStatus
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
        result: ''
    },
    rules: {
        result: [{
            required: true,
            message: '测评结果不能为空',
            trigger: 'blur'
        }]
    },
    getData,
    update: updateAdvise,
    currentPage
})




const ExportExcelRef = ref(null)
const handleExportExcel = () => ExportExcelRef.value.open();


</script>
<style>
.choose-image-btn {
    @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
}
</style>