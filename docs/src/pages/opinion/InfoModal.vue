<template>
    <el-drawer title="意见反馈" v-model="dialogVisible" size="50%">
        <el-card shadow="never" class="mb-3">
            <template #header>
                <b class="text-sm">意见反馈</b>
            </template>
            <el-form>
                <el-form-item>
                   {{ info.description }}
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="never" class="mb-3">
            <template #header>
                <b class="text-sm">反馈图片</b>
            </template>
            <div class="flex mb-2">
                <el-image v-show="info.image1?.url != null" :src="info.image1?.url"  fit="cover" :preview-src-list="[info.image1?.url]" :initial-index="0"
                class="w-[200px] h-[200px] rounded border mr-2">
              </el-image>
              <el-image v-show="info.image2?.url != null" :src="info.image2?.url" fit="cover" :preview-src-list="[info.image2?.url]" :initial-index="0" 
                class="w-[200px] h-[200px] rounded border mr-2">
              </el-image><el-image v-show="info.image3?.url != null" :src="info.image3?.url" fit="cover" :preview-src-list="[info.image3?.url]"  :initial-index="0"
                class="w-[200px] h-[200px] rounded border mr-2">
              </el-image>
            </div>
            <div class="flex mb-2">
                <el-image v-show="info.image4?.url != null" :src="info?.image4?.url" fit="cover" :preview-src-list="[info?.image4?.url]"  :initial-index="0" 
                class="w-[200px] h-[200px] rounded border mr-2">
              </el-image>
              <el-image v-show="info.image5?.url != null" :src="info?.image5?.url" fit="cover" :preview-src-list="[info?.image5?.url]"  :initial-index="0"
                class="w-[200px] h-[200px] rounded border mr-2">
              </el-image><el-image v-show="info.image6?.url != null" :src="info?.image6?.url" fit="cover" :preview-src-list="[info?.image6?.url]" :initial-index="0" 
                class="w-[200px] h-[200px] rounded border mr-2">
              </el-image>
            </div>
        </el-card>
    </el-drawer>

    <!-- <ShipInfoModal ref="ShipInfoModalRef" /> -->
</template>
<script setup>
import { ref } from "vue"
// import ShipInfoModal from "./ShipInfoModal.vue"
const props = defineProps({
    info:Object
})
const srcList = ref([])
const numlist = ref([])

const index = ref(null)
const vbs = (val,num)=> {
      if(!srcList.value.find(item => item == val)){
        srcList.value.push(val)
      }
    //   if(!numlist.value.find(item => item == num)){
        numlist.value.push(num)
        index.value = num
    //   }
      console.log(index.value)
    }

const dialogVisible = ref(false)

const open = ()=>{
    dialogVisible.value = true
}

const ShipInfoModalRef = ref(null)
const loading = ref(false)
defineExpose({
    open
})
</script>