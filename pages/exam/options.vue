<template>
  <div>
    <el-card shadow="never" class="border-0">
      <!-- 搜索 -->
      <Search :model="searchForm" @search="getData(currentPage=1, searchForm.title)" @reset="resetSearchForm">
        <SearchItem label="测评名称">
        <el-select v-model="searchForm.title" placeholder="请选择测评">
                    <el-option v-for="item in storeList.value"
                        :key="item.id"
                        :label="item.title"
                        :value="item.title">
                    </el-option>
                </el-select>
                </SearchItem>
      </Search>
      <!-- 新增|刷新 -->
      <ListHeader layout="create,refresh" @create="handleCreate" @refresh="getData">
        <el-button type="danger" size="small" @click="handleMultiDelete">批量删除</el-button>
      </ListHeader>

      <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe
        style="width: 100%" v-loading="loading">
        <el-table-column type="selection" width="50" />
        <el-table-column label="题目名称" width="400" prop="title" align="left" />
        <el-table-column label="所属测评" width="200" align="left">
          <template #default="{ row }">
            {{ row.test.title }}
          </template>
        </el-table-column>
        <el-table-column label="选项" align="left" width="600">
            <template #default="{ row }">
              <p>
                <div class="flex flex-col text-gray-400 text-xs mb-1">
                <span style="display: inline-block" class=" mb-2" v-for="(item, index) in row.options" :key="index">
                        {{
                      !item
                      ? "暂未添加选项"
                      : (`${index+1}.${item.title}`)
                    }}
                  
                </span>
            </div>
              </p>
            </template>
          </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" min-width="150">
          <template #default="scope">
            <div v-if="searchForm.tab != 'delete'">
              <el-button class="px-1" type="primary" size="small" text @click="
                handleEdit(scope.row);projectToString(scope.row);
              ">修改</el-button>

              <el-popconfirm title="是否要删除该商品？" confirmButtonText="确认" cancelButtonText="取消"
                @confirm="handleDelete([scope.row.id])">
                <template #reference>
                  <el-button class="px-1" text type="primary" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
            <span v-else>暂无操作</span>
          </template>
        </el-table-column>
      </el-table>
      <FormDrawer destroyOnClose ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">

          <el-form-item label="题目名称" prop="title">
            <el-input v-model="form.title" placeholder="请输入项目名称，不能超过60个字符"></el-input>
          </el-form-item>
          <el-form-item label="所属测评" prop="test_test">
            <el-select v-model="form.test_test" placeholder="请选择">
              <el-option v-for="item in storeList.value" :key="item.id" :label="item.title" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选项" prop="categoryList">
              <skusInput
                v-model="form.categoryList"
                :status="status"
                @changeStatus="changeStatus('skus')"
              />
            </el-form-item>
        </el-form>
      </FormDrawer>
    </el-card>
  </div>
</template>
<script setup>
import { reactive, ref,onMounted } from "vue";
import ListHeader from "~/components/ListHeader.vue";
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";
import FormDrawer from "~/components/FormDrawer.vue";
import { getCategory } from '~/graphql/getAddCategory';
import skusInput from "~/components/skusInput.vue";
import { getstore } from "~/graphql/getTest"
import {
  getAddproject,
  deleteProduct,
  createProduct,
  updateProduct,
} from "~/graphql/getOption";
import { useInitTable, useInitForm } from "~/composables/useCommon.js";

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
} = useInitTable({
  searchForm: {
    title: ""
  },
  getList: getAddproject,
  onGetListSuccess: (res) => {
    tableData.value = res.list.map((o) => {
      o.bannersLoading = false;
      o.contentLoading = false;
      o.skusLoading = false;
      return o;
    });
  },
  delete: deleteProduct
});

const categoryList = reactive([]);
const storeList = reactive([])
onMounted(()=>{
  getCategory().then((res) => {
  categoryList.value = res.list;
  return;
});
getstore().then((res)=>{
  storeList.value = res.list;
  console.log(storeList.value,'storeList')
  return;
})
})

const status = ref("");
  const changeStatus = (res) => {
    if (res == "skus") {
      status.value = "skus";
    } else {
      status.value = "price";
    }
  };


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
    title: "",
    test_test:null,
    categoryList: ""
  },
  rules: {
    title: [
      {
        required: true,
        message: "项目名称不能为空",
        trigger: "blur",
      }
    ],
    test_test: [
      {
        required: true,
        message: "请选择所属测评",
        trigger: "blur",
      }
    ]
  },
  getData,
  update: updateProduct,
  create: createProduct,
  currentPage,
});

const projectToString = (row) => {
    form.categoryList = row.options.map((o)=>{
      return o.title;
    }).join();
  }


</script>
<style>
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
}
</style>