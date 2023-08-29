<template>
  <div>
    <el-card shadow="never" class="border-0">
      <!-- 搜索 -->
      <Search
        :model="searchForm"
        @search="getData(currentPage, searchForm.name)"
        @reset="resetSearchForm"
      >
        <SearchItem label="商品名称">
          <el-input
            v-model="searchForm.name"
            placeholder="商品名称"
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
          label="商品编号"
          width="80"
          prop="erp_item_id"
          align="center"
        />
        <el-table-column label="商品" width="300" align="center">
          <template #default="{ row }">
            <div class="flex">
              <el-image
                class="mr-3 rounded"
                :src="row?.image?.url"
                fit="cover"
                :lazy="true"
                style="width: 80px; height: 80px"
              >
              </el-image>
              <div class="flex-1">
                <p>{{ row?.name }}</p>
                <div>
                  <span class="text-rose-500">￥{{ row?.price }}</span>
                  <el-divider direction="vertical" />
                  <span class="text-gray-500 text-xs"
                    >￥{{ row?.original_price }}</span
                  >
                </div>
                <p>
                  {{ "分类" }}
                  <span
                    style="display: inline-block"
                    v-for="(item, index) in row.category"
                    :key="index"
                  >
                    <p class="text-gray-400 text-xs mb-1">
                      {{
                        item != null
                          ? (index == 0 ? "：" : "|") + item.category.title
                          : "未分类"
                      }}
                    </p>
                  </span>
                </p>
                <p class="text-gray-400 text-xs">
                  创建时间：{{ row?.created_at.slice(0, 10) }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="80" prop="idx" align="center">
          <template #default="{ row }">
            {{ row?.idx }}
          </template>
        </el-table-column>
        <el-table-column
          label="实际销量"
          width="80"
          prop="sale_count"
          align="center"
        >
          <template #default="{ row }">
            {{ row.sale_count ? row.sale_count : 0 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="is_show"
          width="150"
          label="状态(上架/下架)"
          align="center"
        >
          <template #default="{ row }">
            <el-switch
              :modelValue="row?.is_show"
              :active-value="true"
              :inactive-value="false"
              :loading="row?.statusLoading"
              @change="handleStatusChange($event, row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="总库存"
          width="90"
          prop="reserve"
          align="center"
        />
        <el-table-column
          label="原价格"
          width="90"
          prop="original_price"
          align="center"
        />
        <el-table-column
          label="销售价格"
          width="90"
          prop="price"
          align="center"
        />
        <el-table-column label="规格" width="300" prop="price" align="center">
          <template #default="{ row }">
            <p>
              {{ row?.skus[0]?.sku_key
              }}<span
                style="display: inline-block"
                v-for="(item, index) in row?.skus"
                :key="index"
              >
                <p class="text-gray-400 text-xs mb-1">
                  {{
                    row?.skus?.length != 0
                      ? (index == 0 ? "：" : "|") + item?.sku_value
                      : ""
                  }}
                </p>
              </span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="商品副标题" width="200" align="center">
          <template #default="{ row }">
            {{ row?.sub_title }}
          </template>
        </el-table-column>
        <el-table-column label="商品详情" width="300" align="center">
          <template #default="{ row }">
            {{ row?.description }}
          </template>
        </el-table-column>
        <el-table-column label="商品详情图" width="300" align="center">
          <template #default="{ row }">
            <el-image
              v-for="(item, index) in row?.images"
              :key="index"
              class="mr-3 rounded"
              :src="item.image.url"
              fit="cover"
              :lazy="true"
              style="width: 80px; height: 80px"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
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
          label-width="80px"
          :inline="false"
        >
          <el-form-item label="推荐排序" prop="idx">
            <el-input
              v-model="form.idx"
              type="number"
              placeholder="idx小于等于4将会显示在购物车的推荐页"
            >
              <template #append>推荐排序</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品编号" prop="erp_item_id">
            <el-input v-model="form.erp_item_id" type="number">
              <template #append>商品编号</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入商品名称，不能超过60个字符"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="category">
            <TagInput
              v-model="form.category"
              :statuss="statuss"
              @changeStatus2="changeStatus2('category')"
            />
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
          <el-form-item label="副标题" prop="sub_title">
            <el-input
              type="textarea"
              v-model="form.sub_title"
              placeholder="选填，商品卖点"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="description">
            <el-input
              type="textarea"
              rows="8"
              v-model="form.description"
              placeholder="商品详情描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="详情图片" prop="fileList">
            <el-upload
              v-model:file-list="form.fileList"
              action
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-change="onChange2"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="销售价格" prop="price">
            <el-input v-model="form.price" type="number" style="width: 40%">
              <template #append>元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="原价" prop="original_price">
            <el-input
              v-model="form.original_price"
              type="number"
              style="width: 40%"
            >
              <template #append>元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="总库存" prop="reserve">
            <el-input v-model="form.reserve" type="number" style="width: 40%">
              <template #append>件</template>
            </el-input>
          </el-form-item>
          <el-form-item label="规格名" prop="key">
            <el-input
              v-model="form.key"
              placeholder="请输入规格名"
              style="width: 40%"
            ></el-input>
          </el-form-item>
          <el-form-item label="规格值" prop="skus">
            <skusInput
              v-model="form.skus"
              :status="status"
              @changeStatus="changeStatus('skus')"
            />
          </el-form-item>
          <el-form-item label="对应加价" prop="sku_prices">
            <skusInput
              v-model="form.sku_prices"
              :status="status"
              @changeStatus="changeStatus('price')"
            />
          </el-form-item>
          <el-form-item label="是否上架" prop="is_show">
            <el-switch
              v-model="form.is_show"
              :active-value="true"
              :inactive-value="false"
            >
            </el-switch>
          </el-form-item>
        </el-form>
      </FormDrawer>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
import ListHeader from "~/components/ListHeader.vue";
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";
import FormDrawer from "~/components/FormDrawer.vue";
import CryptoJS from "crypto-js";
import skusInput from "~/components/skusInput.vue";
import TagInput from "~/components/TagInput.vue";
import {
  getProduct,
  deleteProduct,
  updateProductStatus,
  createProduct,
  updateProduct,
} from "~/graphql/getProduct";
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
  getList: getProduct,
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

const validatePass = async (rule, value, callback) => {
  if (value === "") {
    return callback(new Error("规格定价不能为空"));
  } else {
    if (
      value &&
      form.skus.split(",").length != form.sku_prices.split(",").length
    ) {
      return callback(new Error("规格值和规格定价要一一对应"));
    }
  }
};

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
    idx: null,
    erp_item_id: null,
    name: "",
    description: "",
    is_show: true,
    price: null,
    original_price: null,
    reserve: null,
    sale_count: null,
    sub_title: "",
    key: "",
    skus: "",
    sku_prices: "",
    image_id: "",
    imageUrl: "",
    category: "",
    fileList:[]
  },
  rules: {
    idx: [
      {
        required: true,
        message: "推荐排序不能为空",
        trigger: "blur",
      },
    ],
    erp_item_id: [
      {
        required: true,
        message: "推荐排序不能为空",
        trigger: "blur",
      },
    ],
    name: [
      {
        required: true,
        message: "商品名称不能为空",
        trigger: "blur",
      },
    ],
    skus: [
      {
        required: true,
        message: "规格值不能为空",
        trigger: "blur",
      },
    ],
    sku_prices: [
      {
        required: true,
        trigger: "blur",
        validator: validatePass,
      },
    ],
    category: [
      {
        required: true,
        message: "分类不能为空",
        trigger: "blur",
      },
    ],
    key: [
      {
        required: true,
        message: "规格名不能为空",
        trigger: "blur",
      },
    ],
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

const onChange2 = (file) => {
  if (file.status !== "ready") return;

  typeName.value = file.name.split(".").pop().toLowerCase();
  console.log(typeName.value);
  contentType.value = file.raw.type;
  md5Base64(file.raw).then((res) => {
    md5.value = res;
    updateImage(res, typeName.value.toUpperCase()).then((res) => {
      form.fileList.push({
        "name":res.data.imagePresignedUrl.imageId,
        "url":res.data.imagePresignedUrl.downloadUrl
      })
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
          //form.imageUrl = url.value;
          console.log(form.fileList)
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
  let key_list = row.skus[0].sku_key;
  let value_list = row.skus.map((o) => {
    return o.sku_value;
  });
  let price_list = row.skus.map((o) => {
    return o.price.toString();
  });
  let category_list = row.category.map((o) => {
    return o.category.title;
  });
  form.key = key_list;
  form.skus = value_list.join();
  form.sku_prices = price_list.join();
  form.category = category_list.join();
  form.fileList = row.images.map((o) => {
    return {
      name: o.image.id,
      url: o.image.url,
    };
  });
};

const status = ref("");
const changeStatus = (res) => {
  if (res == "skus") {
    status.value = "skus";
  } else {
    status.value = "price";
  }
};
const statuss = ref("");
const changeStatus2 = (res) => {
  if (res == "staff") {
    statuss.value = "staff";
  } else {
    statuss.value = "category";
  }
};

//上传详情

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles,form.fileList);
};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url ?? "";
  dialogVisible.value = true;
};
</script>
<style>
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-center items-center cursor-pointer hover: (bg-gray-100);
}
</style>