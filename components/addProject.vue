<template>
  <div>
    <el-card shadow="never" class="border-0">
      <!-- 搜索 getData(currentPage, searchForm.name)-->
      <Search :model="searchForm" @search="searchName(searchForm.name)" @reset="reset">
        <SearchItem label="项目名称">
          <el-input v-model="searchForm.name" placeholder="项目名称" clearable></el-input>
        </SearchItem>
      </Search>
      <div>{{ store }}</div>
      <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe :row-key="getRowKey"
        style="width: 100%" v-loading="loading" >
        <el-table-column type="selection" />
        <el-table-column label="项目名称" prop="title" align="left" />

        <el-table-column label="所属分类" align="left">
          <template #default="{ row }">
            {{ categoryList.value?.find(o => o.id == row?.category_add_project_categray)?.name }}
          </template>
        </el-table-column>
        <el-table-column label="价格" prop="price" align="left" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, defineEmits ,watch,nextTick} from "vue";
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";
import { getCategory } from '~/graphql/getAddCategory'
import {
  getAddproject,
  deleteProduct,
} from "~/graphql/getAddProject";
import { useInitTable, useInitForm } from "~/composables/useCommon.js";

const props = defineProps({
  modelValue: String,
  addProject: {
    type: Array,
    default: () => [],
  },
});

const selectionIds = ref([]);




const multipleTableRef = ref(null);





const toggleSelection = (rows) => {
  if (rows) {
    rows.forEach((row) => {
      console.log(rows, 'rows', row);
      // 使用 $nextTick 确保在 DOM 更新后再执行
      nextTick(() => {
        multipleTableRef.value.toggleRowSelection(tableData.value.find(o => o.id == row), true);
      });
    });
  } else {
    // 使用 $nextTick 确保在 DOM 更新后再执行
    nextTick(() => {
      multipleTableRef.value.clearSelection();
    });
  }
};
let previousSelectionIds = ref([]);


const searchName = (title) => {
  // 存储当前的选择状态
  previousSelectionIds = [...selectionIds.value];
  
  // 过滤数据
  tableData.value = tableData.value.filter((o) => o.title === title);

  // 更新选择状态（将之前的选择状态重新应用）
  selectionIds.value = previousSelectionIds.filter(id =>
    tableData.value.some(row => row.id === id)
  );

  toggleSelection(selectionIds.value);
};

const reset = () => {
  tableData.value = allData.value;
  
  // 更新 selectionIds，保留之前的选择值
  selectionIds.value = selectionIds.value.filter((id) =>
    allData.value.some((row) => row.id === id)
  );
  previousSelectionIds = [...previousSelectionIds,...selectionIds.value]
  toggleSelection(previousSelectionIds);
};

const getRowKey = (row) => {
  return row.id;
};

const emit = defineEmits(['dropDownValueChange']);


const allData = reactive([])


let handleSelectionChange = (e) => {
  selectionIds.value = [...e.map(o => o?.id??o),selectionIds.value];
  emit('dropDownValueChange', selectionIds.value);
};

const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit = 99,
  getData,
  handleDelete,
  multiSelectionIds
} = useInitTable({
  searchForm: {
    name: "",
  },
  getList: getAddproject,
  onGetListSuccess: (res) => {
    tableData.value = res.list;
    allData.value = res.list;
  },
  delete: deleteProduct
});

const categoryList = reactive([]);
const store = ref("")
onMounted(async () => {
  store.value = props.modelValue?.split(':')[0];
  //getData(currentPage,'666')
  await getData(currentPage,store.value);
  console.log(store.value,props.addProject,'store.value')
  getCategory().then((res) => {
    categoryList.value = res.list;
    toggleSelection(props.addProject);
    
  });
});
watch(
      () => props.modelValue,
      (newValue, oldValue) => {
        console.log('props.modelValue 变化了：', newValue);
        store.value = newValue?.split(':')[0];
        getData(currentPage, store.value)
      }
    );
</script>