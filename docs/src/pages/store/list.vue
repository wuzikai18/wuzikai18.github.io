<template>
  <div>
    <el-card shadow="never" class="border-0">
      <!-- 新增|刷新 -->
      <ListHeader layout="create,refresh" @create="handleCreate" @refresh="getData">
        <el-button type="danger" size="small" @click="handleMultiDelete">批量删除</el-button>
      </ListHeader>
      <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe
        style="width: 100%" v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column label="医院名称" prop="name" align="left" />
        <el-table-column label="医院等级" prop="level" align="left" />
        <el-table-column label="医院图标" align="left">
          <template #default="{ row }">
            <div>
              <img :src="row?.image?.url" width="50" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="套餐分类" align="left">
          <template #default="{ row }">
            <p>
              <span style="display: inline-block" v-for="(item, index) in row.staffs" :key="index">
                <p class="text-gray-400 text-xs mb-1">
                  {{
                    !item
                    ? "未分类"
                    : (index == 0 ? "" : " | ") + item?.name
                  }}
                </p>
              </span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="城市" prop="city" align="left" />
        <el-table-column label="详细地址" prop="addres_detail" align="left" />
        <el-table-column label="基础价格" prop="basic_price" align="left" />

        <el-table-column label="操作" align="center">
          <template #default="scope">
            <div>
              <el-button class="px-1" type="primary" size="small" text
                @click="handleEdit(scope.row); projectToString(scope.row)">修改</el-button>
              <el-popconfirm title="是否要删除该商品？" confirmButtonText="确认" cancelButtonText="取消"
                @confirm="handleDelete([scope.row.id])">
                <template #reference>
                  <el-button class="px-1" text type="primary" size="small">删除</el-button>
                </template>
              </el-popconfirm>
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
          <el-form-item label="医院名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入医院名称"></el-input>
          </el-form-item>
          <el-form-item label="医院等级" prop="level">
            <el-input v-model="form.level" placeholder="请输入医院等级"></el-input>
          </el-form-item>
          <el-form-item label="所在城市" prop="city">
            <el-input v-model="form.city" placeholder="请输入所在城市"></el-input>
          </el-form-item>
          <el-form-item label="医院图标" prop="image_id">
            <el-upload ref="upload" v-model="form.image_id" class="avatar-uploader" action :on-change="onChange"
              :limit="1">
              <div v-if="!form.imageUrl" class="choose-image-btn" @click="open">
                <el-icon :size="25" class="text-gray-500">
                  <Plus />
                </el-icon>
              </div>
              <el-image v-else :src="form.imageUrl" fit="cover" class="w-[100px] h-[100px] rounded border mr-2">
              </el-image>
            </el-upload>
          </el-form-item>
          <el-form-item label="详细地址" prop="addres_detail">
            <el-input type="textarea" rows="8" v-model="form.addres_detail" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="套餐分类" prop="categoryList">
            <skusInput
              v-model="form.categoryList"
              :status="status"
              @changeStatus="changeStatus('skus')"
            />
          </el-form-item>

          <el-form-item label="基础价格" prop="basic_price">
            <el-input v-model="form.basic_price" type="number" style="width: 40%">
              <template #append>元</template>
            </el-input>
          </el-form-item>
        </el-form>
      </FormDrawer>

    </el-card>

  </div>
</template>
<script setup>
import { ref } from "vue"
import ListHeader from "~/components/ListHeader.vue";
import FormDrawer from "~/components/FormDrawer.vue";
import CryptoJS from 'crypto-js'
import { updateProductStatus, createProduct, updateProduct } from "~/graphql/getProduct"

import { updateImage } from '~/graphql/getImage'
import { useInitTable, useInitForm } from '~/composables/useCommon.js'
import skusInput from "~/components/skusInput.vue";
import { getstore, deletestore, createstore, updatestore } from "~/graphql/getstore"

const status = ref("");
const changeStatus = (res) => {
  if (res == "skus") {
    status.value = "skus";
  } else {
    status.value = "price";
  }
};
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
  getList: getstore,
  onGetListSuccess: (res) => {
    tableData.value = res.list.map(o => {
      o.bannersLoading = false
      o.contentLoading = false
      o.skusLoading = false
      return o
    })
  },
  delete: deletestore,
  updateStatus: updateProductStatus
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
    name: '',
    addres_detail: '',
    level: '',
    image_id: '',
    imageUrl: '',
    basic_price: '',
    city: '',
    categoryList: ""
  },
  rules: {
    title: [{
      required: true,
      message: '文章名不能为空',
      trigger: 'blur'
    }],
    description: [{
      required: true,
      message: '内容不能为空',
      trigger: 'blur'
    }]
  },
  getData,
  update: updatestore,
  create: createstore,
  currentPage
})



const contentType = ref('')
const md5 = ref('')
const typeName = ref('')
const url = ref('')
const onChange = (file) => {
  if (file.status !== 'ready') return;
  typeName.value = file.name.slice(-3)
  contentType.value = file.raw.type
  md5Base64(file.raw).then((res) => {
    md5.value = res
    updateImage(res, typeName.value.toUpperCase()).then((res) => {
      if (form.imageUrl) {
        form.avatar_id = res.data.imagePresignedUrl.imageId;
      } else {
        form.image_id = res.data.imagePresignedUrl.imageId;
      }

      url.value = res.data.imagePresignedUrl.downloadUrl;
      var myHeaders = new Headers();
      myHeaders.append("content-md5", md5.value);
      myHeaders.append("Content-Type", contentType.value);
      var requestOptions = {
        headers: myHeaders,
        method: 'PUT',
        body: file.raw
      };
      fetch(res.data.imagePresignedUrl.uploadUrl, requestOptions).then(() => {
        if (form.imageUrl) {
          form.avatarUrl = url.value
        } else {
          form.imageUrl = url.value
        }
      }).catch((err) => {
      })
    })
  })
}
const md5Base64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (e?.target?.result) {
        const wordArray = CryptoJS.lib.WordArray.create(e?.target?.result);
        const hash = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(wordArray));
        resolve(hash);
      } else {
        reject('');
      }
    };
    reader.onerror = () => {
      reject('');
    };
    reader.readAsArrayBuffer(file);
  });
}
const projectToString = (row) => {
  form.imageUrl = row.image.url;
  form.categoryList = row.staffs.map((o)=>{
    return o.name;
  }).join();
}
</script>
<style>
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
}
</style>