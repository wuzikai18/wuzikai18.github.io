<template>
    <el-card shadow="never" class="border-0">
        <ListHeader @create="handleCreate" @refresh="getData"/>
        <el-tree :data="tableData" :props="{ label:'name' }" v-loading="loading" node-key="id">
            <template #default="{ node, data }">
                <div class="custom-tree-node ">
                    <span class="ml-auto ">分类名：{{ data.name }}<br/>排序：{{ data.idx }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <img :src='data.image.url' style="width: 30px; height: 30px"/>

                    <div class="ml-auto">

                        <el-button text type="primary" size="small" @click.stop="handleEdit(data);projectToString(data)">修改</el-button>

                        <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(data.id)">
                            <template #reference>
                                <el-button text type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </div>

                </div>
            </template>
        </el-tree>

        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
              <el-form-item label="排序" prop="idx">
                    <el-input-number v-model="form.idx" placeholder="排序"></el-input-number>
                </el-form-item>
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="form.name" placeholder="分类名称"></el-input>
                </el-form-item>
                <el-form-item label="商品封面" prop="image_id">
            <el-upload
              ref="upload"
              v-model="form.image_id"
              class="avatar-uploader"
              action
              :on-change="onChange"
              :limit="1"
            >
              <div v-if="!form.imageUrl" class="choose-image-btn" @click="open">
                <el-icon :size="25" class="text-gray-500">
                  <Plus />
                </el-icon>
              </div>
              <el-image
                v-else
                :src="form.imageUrl"
                fit="cover"
                class="w-[100px] h-[100px] rounded border mr-2"
              >
              </el-image>
            </el-upload>
          </el-form-item>
            </el-form>
        </FormDrawer>


    </el-card>
</template>
<script setup>
import { ref } from "vue"
import ListHeader from "~/components/ListHeader.vue"
import FormDrawer from "~/components/FormDrawer.vue"
import {getCategory,deleteCategory,createCategory,updateCategory} from "~/graphql/getAddCategory.js"
import CryptoJS from "crypto-js";
import {
    useInitTable,
    useInitForm
} from "~/composables/useCommon.js"
import { updateImage } from "~/graphql/getImage";
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
    name:"",
    image_id: "",
    imageUrl: "",
    idx:""
  },
  rules: {
    name: [{
      required: true,
      message: '分类名称不能为空',
      trigger: 'blur'
    }],
    idx: [{
      required: true,
      message: '排序不能为空',
      trigger: 'blur'
    }]
  },

  getData,
  update: updateCategory,
  create: createCategory,
  currentPage
})

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
      form.image_id = res.data.imagePresignedUrl.imageId;
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
          form.imageUrl = url.value;
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
  form.imageUrl = row.image.url;
};

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
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
}
</style>