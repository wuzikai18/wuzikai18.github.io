<template>

  <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false"
    @close="handleClose(tag)">
    {{ tag }}
  </el-tag>
  <el-select ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small" @change="handleInputConfirm" @visible-change="show"
    :placeholder="props.statuss == 'staff' ? '+类型' : '+分类'">
    <el-option v-for="item in (props.statuss == 'staff' ? goodAt : category)" :key="item.id" :label="item.name" :value="item.name">
    </el-option>
  </el-select>
</template>

<script setup>
import { ref ,onMounted, reactive} from 'vue'
import {getCategory} from "~/graphql/getCategory.js"
import {getStaff} from "~/graphql/getNewProject.js"

let category = ref([]);
let goodAt = ref([]);
onMounted(()=>{
  getCategory().then((res)=>{
   category.value =  res.list.map((o)=>{
      return {
        id:o.id,
        name:o.title
      }
    })
  })
  getStaff().then((res)=>{
    goodAt.value =  res.data.staff.map((o)=>{
      console.log(o,'0801')
      return {
        id:o.id,
        name:o.store?.name+":"+o?.name
      }
    })
  })
})

const props = defineProps({
  modelValue: String,
  statuss: String
})
const emit = defineEmits(["update:modelValue","changeStatus2"])

//const goodAt = [{ id: 1, name: '针灸' }, { id: 2, name: '艾灸' }, { id: 3, name: '推拿' }, { id: 4, name: '就诊' }]
const inputValue = ref('')
const dynamicTags = ref(props.modelValue ? props.modelValue.split(',') : [])
const inputVisible = ref(false)
const InputRef = ref()

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
  emit("update:modelValue", dynamicTags.value.join(","))
}

const handleInputConfirm = () => {
  
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
    emit("update:modelValue", dynamicTags.value.join(","))
  }
  inputVisible.value = false
  inputValue.value = ''
  console.log(props.statuss)
}

const show = ()=>{
  emit("changeStatus2")
}
</script>