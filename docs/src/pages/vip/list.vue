<template>
    <div>
      <el-card shadow="never" class="border-0">
        <!-- 搜索 -->
        <Search
          :model="searchForm"
          @search="getData(currentPage, searchForm.title)"
          @reset="resetSearchForm"
        >
          <SearchItem label="套餐名称">
            <el-input
              v-model="searchForm.title"
              placeholder="套餐名称"
              clearable
            ></el-input>
          </SearchItem>
        </Search>
        <!-- 新增|刷新 -->
        <ListHeader
          layout="create,refresh"
          @create="handleCreate"
          @refresh="getData"
        >
          <el-button type="danger" size="small" @click="handleMultiDelete"
            >批量删除</el-button
          >
        </ListHeader>
  
        <el-table
          ref="multipleTableRef"
          @selection-change="handleSelectionChange"
          :data="tableData"
          stripe
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            label="套餐名称"
            width="150"
            prop="title"
            align="left"
          />
          <el-table-column
          label="套餐图片"
            width="150"
            align="left">
            <template #default="{ row }">
            <el-image
                  class="mr-3 rounded"
                  :src="row?.detail_img?.url"
                  fit="cover"
                  :lazy="true"
                  style="width: 80px; height: 80px"
                  :preview-src-list="[row?.detail_img?.url]"
                  :preview-teleported="true"
                >
                </el-image>
              </template>
            </el-table-column>
          <el-table-column
            label="销售价格"
            width="90"
            prop="price"
            align="left"
          />
          <el-table-column label="商品副标题" width="150" align="left">
            <template #default="{ row }">
              {{ row?.description }}
            </template>
          </el-table-column>
          <el-table-column label="商品详情" width="300" align="left">
            <template #default="{ row }">
              {{ row?.description }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="left"
            fixed="right"
            min-width="150"
          >
            <template #default="scope">
              <div v-if="searchForm.tab != 'delete'">
                <el-button
                  class="px-1"
                  type="primary"
                  size="small"
                  text
                  @click="
                    handleEdit(scope.row);
                    projectToString(scope.row);
                  "
                  >修改</el-button
                >
  
                <el-popconfirm
                  title="是否要删除该商品？"
                  confirmButtonText="确认"
                  cancelButtonText="取消"
                  @confirm="handleDelete([scope.row.id])"
                >
                  <template #reference>
                    <el-button class="px-1" text type="primary" size="small"
                      >删除</el-button
                    >
                  </template>
                </el-popconfirm>
              </div>
              <span v-else>暂无操作</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
          <el-pagination
            background
            layout="prev, pager ,next"
            :page-count="total"
            :current-page="currentPage"
            :page-size="limit"
            @current-change="getData"
          />
        </div>
        <FormDrawer
          destroyOnClose
          ref="formDrawerRef"
          :title="drawerTitle"
          @submit="handleSubmit"
        >
        <el-form
            :model="form"
            ref="formRef"
            :rules="rules"
            label-width="120px"
            :inline="false"
          >
            <el-form-item label="套餐名称" prop="title">
              <el-input
                v-model="form.title"
                placeholder="请输入套餐名称，不能超过60个字符"
              ></el-input>
            </el-form-item>
            <el-form-item label="套餐副标题" prop="sub_title">
              <el-input
                v-model="form.sub_title"
                placeholder="请输入套餐副标题，不能超过60个字符"
              ></el-input>
            </el-form-item>
            <el-form-item label="套餐封面" prop="detail_img_id">
              <el-upload
                ref="upload"
                v-model="form.detail_img_id"
                class="avatar-uploader"
                action
                :on-change="onChange"
                :limit="1"
              >
                <div v-if="!form.detail_img_url" class="choose-image-btn" @click="open">
                  <el-icon :size="25" class="text-gray-500">
                    <Plus />
                  </el-icon>
                </div>
                <el-image
                  v-else
                  :src="form.detail_img_url"
                  fit="cover"
                  class="w-[100px] h-[100px] rounded border mr-2"
                >
                </el-image>
              </el-upload>
            </el-form-item>
            <el-form-item label="套餐描述" prop="description">
              <el-input
                type="textarea"
                rows="8"
                v-model="form.description"
                placeholder="套餐详情描述"
              ></el-input>
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
  import { ref ,onMounted} from "vue";
  import ListHeader from "~/components/ListHeader.vue";
  import Search from "~/components/Search.vue";
  import SearchItem from "~/components/SearchItem.vue";
  import FormDrawer from "~/components/FormDrawer.vue";
  import CryptoJS from "crypto-js";
  import {getAddproject,createProduct,updateProduct,deleteProduct,updateProductStatus} from "~/graphql/getVIP";
  import { updateImage } from "~/graphql/getImage";
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
    handleStatusChange,
    handleDelete,
  } = useInitTable({
    searchForm: {
      name: "",
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
    delete: deleteProduct,
    updateStatus: updateProductStatus,
  });
  
  
  
  const fileList = ref([]);
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
      sub_title: "",
      description: "",
      price: null,
      detail_img_id: "",
      detail_img_url: ""
    },
    rules: {
        title: [
        {
          required: true,
          message: "套餐名称不能为空",
          trigger: "blur",
        },
      ],
      sub_title: [
        {
          required: true,
          message: "套餐名称不能为空",
          trigger: "blur",
        },
      ],
      description: [
        {
          required: true,
          message: "套餐描述不能为空",
          trigger: "blur",
        },
      ],
      price: [
        {
          required: true,
          message: "价格不能为空",
          trigger: "blur",
        },
      ],
      detail_img_id: [
        {
          required: true,
          message: "图片不能为空",
          trigger: "blur",
        },
      ]
    },
    getData,
    update: updateProduct,
    create: createProduct,
    currentPage,
  });
  
  const contentType = ref("");
  const md5 = ref("");
  const typeName = ref("");
  const url = ref("");
  const onChange = (file) => {
    if (file.status !== "ready") return;
  
    typeName.value = file.name.split(".").pop().toLowerCase();
    console.log(typeName.value);
    contentType.value = file.raw.type;
    md5Base64(file.raw).then((res) => {
      md5.value = res;
      updateImage(res, typeName.value.toUpperCase()).then((res) => {
        form.detail_img_id = res.data.imagePresignedUrl.imageId;
        url.value = res.data.imagePresignedUrl.downloadUrl;
        var myHeaders = new Headers();
        myHeaders.append("content-md5", md5.value);
        myHeaders.append("Content-Type", contentType.value);
        var requestOptions = {
          headers: myHeaders,
          method: "PUT",
          body: file.raw,
        };
        fetch(res.data.imagePresignedUrl.uploadUrl, requestOptions)
          .then(() => {
            form.detail_img_url = url.value;
          })
          .catch((err) => {});
      });
    });
  };
  
  const md5Base64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        if (e?.target?.result) {
          const wordArray = CryptoJS.lib.WordArray.create(e?.target?.result);
          const hash = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(wordArray));
          resolve(hash);
        } else {
          reject("");
        }
      };
      reader.onerror = () => {
        reject("");
      };
      reader.readAsArrayBuffer(file);
    });
  };
  
  const projectToString = (row) => {
    form.detail_img_id = row.detail_img.id;
    form.detail_img_url = row.detail_img.url;
  }


  </script>
  <style>
  .choose-image-btn {
    @apply w-[100px] h-[100px] rounded border flex justify-left items-left cursor-pointer hover: (bg-gray-100);
  }
  .addProjectContent{
    width: 100%;
  }
  </style>