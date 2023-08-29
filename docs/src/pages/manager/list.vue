<template>
  <div>
    <el-card shadow="never" class="border-0">
      <!-- 搜索 -->
      <Search :model="searchForm" @search="getData(currentPage, searchForm.name)" @reset="resetSearchForm">
        <SearchItem label="商品名称">
          <el-input v-model="searchForm.name" placeholder="商品名称" clearable></el-input>
        </SearchItem>
      </Search>
      <!-- 新增|刷新 -->
      <ListHeader layout="create,refresh" @create="handleCreate" @refresh="getData">
        <el-upload action="#" :auto-upload="false" :on-change="uploadExcel" :limit="1" :show-file-list="false"
          accept=".xls,.xlsx" class="mr-4 mb-2">
          <el-button size="small" type="primary">上传excel</el-button>
        </el-upload>
        <el-button
            size="small" type="primary" @click="handleExportExcel">导出模板</el-button>
        <el-button type="danger" size="small" @click="handleMultiDelete">批量删除</el-button>

      </ListHeader>

      <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe
        style="width: 100%" v-loading="loading">
        <el-table-column type="selection" width="55" />
        <el-table-column label="套餐名称" width="150" prop="name" align="left" />
        <el-table-column label="套餐图片" width="200" align="left">
          <template #default="{ row }">
            <el-image class="mr-3 rounded" :src="row?.image?.url" fit="cover" :lazy="true"
              style="width: 80px; height: 80px" :preview-src-list="[row?.image?.url]" :preview-teleported="true">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="每日限次" width="90" prop="daily_limit" align="left" />
        <el-table-column label="销售价格" width="90" prop="price" align="left" />
        <el-table-column label="商品详情" width="300" align="left">
          <template #default="{ row }">
            {{ row?.description }}
          </template>
        </el-table-column>
        <el-table-column label="注意事项图" width="200" align="left">
          <template #default="{ row }">
            <el-image class="mr-3 rounded" :src="row?.notice?.url" fit="cover" :lazy="true"
              style="width: 80px; height: 80px" :preview-src-list="[row?.notice?.url]" :preview-teleported="true">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品详情图" width="300" align="left">
          <template #default="{ row }">
            <el-image v-for="(item, index) in row?.detail_images" :key="index" class="mr-3 rounded" :src="item.image.url"
              fit="cover" :lazy="true" style="width: 80px; height: 80px" :preview-src-list="[item?.image?.url]"
              :preview-teleported="true">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="套餐分类" width="200" align="left">
          <template #default="{ row }">
            <p>
              <span style="display: inline-block" v-for="(item, index) in row.staffs" :key="index">
                <p class="text-gray-400 text-xs mb-1">
                  {{
                    item != null
                    ? (index == 0 ? "" : "|") + (item.staff?.name ?? "")
                    : "未分类"
                  }}
                </p>
              </span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="所属机构" width="200" align="left">
          <template #default="{ row }">
            {{ row?.staffs?.[0]?.staff?.store?.name }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" fixed="right" min-width="150">
          <template #default="scope">
            <div v-if="searchForm.tab != 'delete'">
              <el-button class="px-1" type="primary" size="small" text @click="
                handleEdit(scope.row);
              projectToString(scope.row);
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
      <div class="flex items-center justify-center mt-5">
        <el-pagination background layout="prev, pager ,next" :page-count="total" :current-page="currentPage"
          :page-size="limit" @current-change="getData" />
      </div>
      <FormDrawer destroyOnClose ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit"><el-tabs
          v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="120px" :inline="false">
              <el-form-item label="套餐名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入商品名称，不能超过60个字符"></el-input>
              </el-form-item>
              <el-form-item label="套餐类型" prop="category">
                <TagInput v-model="form.category" :statuss="statuss" @changeStatus2="changeStatus2('staff')" />
              </el-form-item>
              <el-form-item label="套餐封面" prop="image_id">
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
              <el-form-item label="套餐描述" prop="description">
                <el-input type="textarea" rows="8" v-model="form.description" placeholder="套餐详情描述"></el-input>
              </el-form-item>
              <el-form-item label="注意事项图" prop="fileList1">
                <el-upload v-model:file-list="form.fileList1" action :limit="1" list-type="picture-card"
                  :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                  :on-change="createOnChangeHandler('fileList1')">
                  <el-icon>
                    <Plus />
                  </el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                  <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
              </el-form-item>
              <el-form-item label="套餐简介图" prop="fileList2">
                <el-upload v-model:file-list="form.fileList2" action list-type="picture-card"
                  :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                  :on-change="createOnChangeHandler('fileList2')">
                  <el-icon>
                    <Plus />
                  </el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                  <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
              </el-form-item>
              <el-form-item label="体检须知图" prop="fileList3">
                <el-upload v-model:file-list="form.fileList3" action list-type="picture-card"
                  :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                  :on-change="createOnChangeHandler('fileList3')">
                  <el-icon>
                    <Plus />
                  </el-icon>
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
              <el-form-item label="每日限次" prop="daily_limit">
                <el-input v-model="form.daily_limit" type="number" style="width: 40%">
                  <template #append>次</template>
                </el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="套餐项目" name="second">
            <el-form-item prop="addProject">
              <addProject v-model="form.category" @dropDownValueChange="selectionIdsChange" :addProject="form.addProject"
                class="addProjectContent" />
            </el-form-item>
          </el-tab-pane>
        </el-tabs>

      </FormDrawer>
    </el-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import ListHeader from "~/components/ListHeader.vue";
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";
import FormDrawer from "~/components/FormDrawer.vue";
import CryptoJS from "crypto-js";
import TagInput from "~/components/TagInput.vue";
import { getAddproject } from "~/graphql/getAddproject";
import addProject from '~/components/addProject.vue';
import AwXlsx from 'aw-xlsx'
import XLSX from 'xlsx'
import { toast } from "~/composables/util"
import {
  getProduct,
  deleteProduct,
  updateProductStatus,
  createProduct,
  updateProduct,
  createProductByExcel
} from "~/graphql/getNewProject";
import { updateImage } from "~/graphql/getImage";
import { useInitTable, useInitForm } from "~/composables/useCommon.js";


const selectionIdsChange = (e) => {
  form.addProject = e;
  console.log('in parent compoennt, e=', form.addProject)
}
const InputRef = ref()
const handleClose = (tag) => {
  form.addProject = form.addProject.filter(o => o.id != tag.id)
}
const inputValue = ref({})
const handleInputConfirm = (tag) => {
  console.log(tag, 'tag')
  inputValue.value = tag
  form.addProject.push(tag)
}
const addproject = ref([])
onMounted(() => {
  getAddproject().then((res) => {
    addproject.value = res.list.map((o) => {
      return {
        id: o.id,
        name: o.title
      }
    })
  })
})
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
    name: "",
    description: "",
    price: null,
    daily_limit: null,
    image_id: "",
    imageUrl: "",
    category: "",
    fileList1: [],
    fileList2: [],
    fileList3: [],
    addProject: [],
  },
  rules: {
    name: [
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
    image_id: [
      {
        required: true,
        message: "图片不能为空",
        trigger: "blur",
      },
    ],
    category: [
      {
        required: true,
        message: "套餐类型不能为空",
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
        .catch((err) => { });
    });
  });
};
// 定义一个闭包函数，用于包装onChange2方法
function createOnChangeHandler(fileListName) {
  return function (file, fileList) {
    console.log(file, fileList, "file, fileList")
    // 在闭包函数内部，可以访问到对应的fileList
    if (fileListName === 'fileList1') {
      onChange2(file, 1);
    } else if (fileListName === 'fileList2') {
      onChange2(file, 2);
    } else if (fileListName === 'fileList3') {
      onChange2(file, 3);
    }
  }
}
const onChange2 = (file, type) => {
  console.log(file, type, 'file,type')
  if (file.status !== "ready") return;

  typeName.value = file.name.split(".").pop().toLowerCase();
  console.log(typeName.value);
  contentType.value = file.raw.type;
  md5Base64(file.raw).then((res) => {
    md5.value = res;
    updateImage(res, typeName.value.toUpperCase()).then((res) => {
      if (type == 1) {
        form.fileList1.push({
          "name": res.data.imagePresignedUrl.imageId,
          "url": res.data.imagePresignedUrl.downloadUrl
        })
      }
      if (type == 2) {
        form.fileList2.push({
          "name": res.data.imagePresignedUrl.imageId,
          "url": res.data.imagePresignedUrl.downloadUrl
        })
      }
      if (type == 3) {
        form.fileList3.push({
          "name": res.data.imagePresignedUrl.imageId,
          "url": res.data.imagePresignedUrl.downloadUrl
        })
      }
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
        .catch((err) => { });
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
  form.image_id = row?.image?.id;
  form.imageUrl = row?.image?.url;
  let category_list = row.staffs.map((o) => {
    return o.staff?.store?.name + ":" + o.staff?.name;
  }).filter(o => o != 'undefined:undefined');
  form.category = category_list.join();
  form.addProject = row.add_projects.map((o) => {
    return o.add_project?.id;
  })
  if(row?.notice?.id){
    form.fileList1 = [{
    name: row?.notice?.id,
    url: row?.notice?.url,
  }];
  }

  form.fileList2 = row.detail_images.filter(o => o.type == 2).map((o) => {
    return {
      name: o.image.id,
      url: o.image.url,
    };
  });
  form.fileList3 = row.detail_images.filter(o => o.type == 3).map((o) => {
    return {
      name: o.image.id,
      url: o.image.url,
    };
  });
  console.log(form.fileList1, 'form.fileList', form.addProject)
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
  console.log(uploadFile, uploadFiles, form.fileList);
};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url ?? "";
  dialogVisible.value = true;
};

const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}


let json_fields = {
  "套餐名称": "name",
  "套餐类型(数据格式类似：'遵义第一人民医院:男性')": "store",
  "套餐描述": "description",
  "销售价格": "price",
  "每日限次": "daily_limit",
  "包含项目(数据用英文逗号隔开,格式类似：'抗缪勒氏管激素检测（AMH）,肺癌肿标,结核抗体滴度测定')": "addProject"
};
let json_data = ref([]);




const handleExportExcel = async () => {
  const data = {
    multiHeader: [],
    header:Object.keys(json_fields), // 数组 Excel 头部
    data:[[]],   // Excel 内容 二维数组 [[]]
    fileName:"模板", // 文件的名称
    merges: [],
    autoWidth: true, // 表头是否自适应
    bookType: "xlsx" // 导出文件类型：'xlsx', 'csv', 'txt'  (默认xlsx)
  }
  AwXlsx(data)
};

const menuData = ref([])
const xlsxData = ref([])
const uploadExcel = (file) => {

  let files = { 0: file.raw }
  const fileReader = new FileReader()
  console.log(fileReader, 'fileReader', XLSX)
  fileReader.onload = (e) => {
    const workbook = XLSX.read(e.target.result, {
      type: 'binary'
    })


    const wsname = workbook.SheetNames[0] // 取第一张表
    const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])// 生成json表格内容

    menuData.value = Object.keys(ws[0])
    console.log(workbook, 'workbook', ws)
    const data = []
    ws.map((item) => {
      let obj = {}
      Object.values(item).map((child, index) => {
        obj[json_fields[menuData.value[index]]] = child
      })
      data.push(obj)
    })
    xlsxData.value = data;

    const allRequests = xlsxData.value.map(async(item)=>{
      await createProductByExcel([item])
    })
    Promise.all(allRequests).then(()=>{
        toast("添加成功");
        setTimeout(()=>{
        getData();
      },2000)
      })
    

  }
  fileReader.readAsBinaryString(files[0])

}




</script>
<style>
.choose-image-btn {
  @apply w-[100px] h-[100px] rounded border flex justify-left items-left cursor-pointer hover: (bg-gray-100);
}

.addProjectContent {
  width: 100%;
}
</style>