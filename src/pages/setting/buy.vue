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
          <el-table-column label="康养标题"  prop="title" align="left" width="200"/>
          <el-table-column label="康养地址"  prop="adress" align="left" width="200"/>
          <el-table-column label="康养日期"  align="left">
            <template #default="{ row }">
              <div>
                <small>{{ row.date.slice(0,10)}}</small>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <div>
                <el-button class="px-1" type="primary" size="small" text @click="handleEdit(scope.row);projectToString(scope.row)">修改</el-button>
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
            <el-form-item label="康养标题" prop="title">
              <el-input v-model="form.title" placeholder="请输入康养标题"></el-input>
            </el-form-item>
            <el-form-item label="康养地址" prop="adress">
              <el-input v-model="form.adress" placeholder="请输入康养地址" style="width:40%;"></el-input>
            </el-form-item>
            <el-form-item label="康养日期" prop="date">
            <el-date-picker v-model="form.date" type="date" placeholder="选择康养日期"
              format="YYYY/MM/DD"  value-format="YYYY/MM/DD"/>
          </el-form-item>
            <el-form-item label="康养图片" prop="image_id">
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
            <el-form-item label="康养详情图片" prop="detail_img_id">
              <el-upload ref="upload" v-model="form.image_id" class="avatar-uploader" action :on-change="onChange2"
                :limit="1">
                <div v-if="!form.detailImgUrl" class="choose-image-btn" @click="open">
                  <el-icon :size="25" class="text-gray-500">
                    <Plus />
                  </el-icon>
                </div>
                <el-image v-else :src="form.detailImgUrl" fit="cover" class="w-[100px] h-[100px] rounded border mr-2">
                </el-image>
              </el-upload>
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
  import { updateProductStatus, createProduct ,updateProduct} from "~/graphql/getProduct"
  
  import { updateImage } from '~/graphql/getImage'
  import { useInitTable, useInitForm } from '~/composables/useCommon.js'
  import {getNews,deleteNews,createNews,updateNews} from "~/graphql/getHealth"
  
  
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
    getList: getNews,
    onGetListSuccess: (res) => {
      tableData.value = res.list.map(o => {
        o.bannersLoading = false
        o.contentLoading = false
        o.skusLoading = false
        return o
      })
    },
    delete: deleteNews,
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
      title: '',
      adress: '',
      date:'',
      image_id: null,
      imageUrl: '',
      detailImgUrl: '',
      detail_img_id: null
    },
    rules: {
      title: [{
        required: true,
        message: '标题不能为空',
        trigger: 'blur'
      }]
      ,
      adress: [{
        required: true,
    message: '地址不能为空',
        trigger: 'blur'
      }],
      date: [{
        required: true,
        message: '日期不能为空',
        trigger: 'blur'
      }]
    },
    getData,
    update: updateNews,
    create: createNews,
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
          form.image_id = res.data.imagePresignedUrl.imageId;
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
            form.imageUrl = url.value
        }).catch((err) => {
        })
      })
    })
  }

  const onChange2 = (file) => {
    if (file.status !== 'ready') return;
    typeName.value = file.name.slice(-3)
    contentType.value = file.raw.type
    md5Base64(file.raw).then((res) => {
      md5.value = res
      updateImage(res, typeName.value.toUpperCase()).then((res) => {
          form.detail_img_id = res.data.imagePresignedUrl.imageId;
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
            form.detailImgUrl = url.value
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
  const projectToString=(row)=>{
    form.imageUrl = row.image.url;
    form.detailImgUrl = row.detail_img.url;
  }
  </script>
  <style>
  .choose-image-btn {
    @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
  }
  </style>