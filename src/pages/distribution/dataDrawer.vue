<template>
    <div v-loading="loading" class="bg-white p-4 rounded">
      <el-form  label-width="160px">
        <h5 class="bg-gray-100 p-3 rounded mb-5">挂号费设置</h5>
        <el-form-item label="挂号费">
            <div>
              <el-input v-model="form.registration_fee" placeholder="挂号费" style="width: 300;" type="number">
              <template #append>元</template>
            </el-input>
            <small class="text-gray-500 flex mt-1">预约项目所需要的挂号费</small>
            </div>
          </el-form-item>
          <el-form-item label="预约金">
            <div>
              <el-input v-model="form.advance_payment"  placeholder="预约金" style="width: 300;" type="number">
              <template #append>元</template>
            </el-input>
            <small class="text-gray-500 flex mt-1">预约项目所需要的预约金</small>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="default" @click="submit" >保存</el-button>
          </el-form-item>
        </el-form>
    </div>
  </template>
  <script setup>
  import { ref, reactive } from "vue"
  import { toast } from "../../composables/util";
  import {getStorePayment,updateStorePayment} from "~/graphql/getStore"
  
  const form = reactive({
    registration_fee: null, 
    advance_payment: null,
  })
  const loading = ref(false)
  function getData() {
    loading.value = true
    getStorePayment().then(res => {
      form.registration_fee = res.list[0].registration_fee;
      form.advance_payment = res.list[0].advance_payment;
  }).finally(()=>{
    loading.value = false
  })
  }
  
  getData()
  
  const submit = ()=>{
    loading.value = true
    updateStorePayment({
      ...form,
    }).then(res=>{
      toast("修改成功")
      getData()
    }).finally(()=>{
      loading.value = false
    })
  }
  </script>