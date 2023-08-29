<template>
  <div>
    <el-card shadow="never" class="border-0">
      <!-- 搜索 -->
      <Search :model="searchForm" @search="getData(currentPage=1, searchForm.name)" @reset="resetSearchForm">
        <SearchItem label="医院名称">
        <el-select v-model="searchForm.name" placeholder="请选择医院">
                    <el-option v-for="item in storeList.value"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
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
        <el-table-column label="项目名称" width="200" prop="title" align="left" />
        
        <el-table-column label="所属分类" width="200" align="left">
          <template #default="{ row }">
            {{ categoryList.value.find(o => o.id == row?.category_add_project_categray)?.name }}
          </template>
        </el-table-column>
        <el-table-column label="所属医院" width="200" align="left">
          <template #default="{ row }">
            {{ row.store.name }}
          </template>
        </el-table-column>
        <el-table-column label="价格" width="90" prop="price" align="left" />
        <el-table-column label="商品副标题" width="600" align="left">
          <template #default="{ row }">
            {{ row?.sub_title }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" min-width="150">
          <template #default="scope">
            <div v-if="searchForm.tab != 'delete'">
              <el-button class="px-1" type="primary" size="small" text @click="
                handleEdit(scope.row);
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

          <el-form-item label="项目名称" prop="title">
            <el-input v-model="form.title" placeholder="请输入项目名称，不能超过60个字符"></el-input>
          </el-form-item>

          <el-form-item label="副标题" prop="sub_title">
            <el-input type="textarea" v-model="form.sub_title" placeholder="选填，项目卖点"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="category_add_project_categray">
            <el-select ref="InputRef" class="ml-1 w-30" size="small" v-model="form.category_add_project_categray" @change="handleInputConfirm"
              placeholder="+项目">
              <el-option v-for="item in categoryList.value" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="所属医院" prop="store_store">
            <el-select v-model="form.store_store" placeholder="请选择">
              <el-option v-for="item in storeList.value" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售价格" prop="price">
            <el-input v-model="form.price" type="number" style="width: 40%">
              <template #append>元</template>
            </el-input>
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
import { getstore } from "~/graphql/getstore"
import {
  getAddproject,
  deleteProduct,
  createProduct,
  updateProduct,
} from "~/graphql/getAddProject";
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
    name: ""
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

const handleInputConfirm = (id) => {
  console.log(id);
  form.category_add_project_categray = id;
  return;
}


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
    price: null,
    sub_title: "",
    category_add_project_categray:null,
    store_store:null
  },
  rules: {
    title: [
      {
        required: true,
        message: "项目名称不能为空",
        trigger: "blur",
      }
    ],
    price: [
      {
        required: true,
        message: "项目价格",
        trigger: "blur",
      }
    ],
    sub_title: [
      {
        required: true,
        message: "项目描述不能为空",
        trigger: "blur",
      }
    ],
    store_store: [
      {
        required: true,
        message: "请选择所属医院",
        trigger: "blur",
      }
    ]
  },
  getData,
  update: updateProduct,
  create: createProduct,
  currentPage,
});




</script>
<style>
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
}
</style>