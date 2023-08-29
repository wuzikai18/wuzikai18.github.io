<template>
    <el-drawer title="导出订单" v-model="dialogVisible" size="40%">
        <el-form :model="form" label-width="80px">
            <el-form-item label="选择医院">
                <el-select v-model="form.store" placeholder="请选择" @change="onSubmit">
                    <el-option v-for="item in storeName"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                
                <json-excel :data="json_data" :fields="json_fields"><el-button type="primary" @click="close">导出</el-button></json-excel>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
<script setup name="vue3-json-excel">
import { ref,reactive } from "vue"
import {getOrderExcel2} from "~/graphql/appointment"
import { toast } from "~/composables/util";
import JsonExcel from "vue-json-excel3";
defineProps({
    tabs:Array,
    storeName:Array
})
const dialogVisible = ref(false)
const open = ()=>dialogVisible.value = true
const close = ()=>dialogVisible.value = false
let json_fields = {
                  "预约人姓名": "name",
                  "预约人年龄": "age",
                  "预约人性别": "gender",
                  "身份证号": "idcard_number",
                  "手机号": "phone",
                  "预约医院": "store",
                  "预约日期": "date",
                  "预约套餐": "project"
          };
         let json_data = ref([]);
const form = reactive({
    tab:null,
    time:"",
    store:""
})
const title = '订单'

const loading = ref(false)
const onSubmit = ()=>{
    if(!form.tab){form.tab = '%%'}
    if(!form.store){form.store = '%%'}
    loading.value = true
    if(form.time && Array.isArray(form.time)){
        starttime = form.time[0]
        endtime = form.time[1]
    }
    getOrderExcel2(form.tab,form.store).then(res=>{
        
        res.data.appointment =  res.data.appointment.map(item=>{
            return {
                "name":item.personal ? item.personal.name : item.family.name,
                "age":item.personal ? item.personal.age : item.family.age,
                "gender": item.personal ? item.personal.gender : item.family.gender,
                "idcard_number": item.personal ? item.personal.idcard_number : item.family.idcard_number,
                "phone": item.personal ? item.personal.phone : item.family.phone,
                "store": item.project?.staff?.store?.name,
                "date": item.date,
                "project": item.project.project.name,
            }
        })
        json_data.value = res.data.appointment;
    })
    console.log(json_data.value)
}

defineExpose({
    open
})
</script>