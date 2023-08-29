<template>
    <el-drawer title="导出订单" v-model="dialogVisible" size="40%">
        <el-form :model="form" label-width="80px">
            <el-form-item label="订单类型">
                <el-select v-model="form.tab" placeholder="请选择" @change="onSubmit">
                    <el-option v-for="item in tabs"
                        :key="item.key"
                        :label="item.name"
                        :value="item.key">
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
import {getOrderExcel,getOrderExcel2} from "~/graphql/getOrder"
import JsonExcel from "vue-json-excel3";
defineProps({
    tabs:Array
})
const dialogVisible = ref(false)

const open = ()=>dialogVisible.value = true
const close = ()=>dialogVisible.value = false
let json_fields = {
                  "买家姓名": "buyer",
                  "交易状态": "trade_status",
                  "实际付款": "final_payment",
                  "订单号": "trade_id",
                  "订单日期": "shipping_time",
                  "收货地址": "address.address",
                  "详细地址": "address.addres_detail",
                  "商品名称": "product",
                  "商品数量": "amount",
                  "规格": "sku",

          };
         let json_data = ref([]);
const form = reactive({
    tab:null,
    time:""
})
const title = '订单'

const loading = ref(false)
const onSubmit = ()=>{
    if(!form.tab){form.tab = '%%'}
    loading.value = true
    if(form.time && Array.isArray(form.time)){
        starttime = form.time[0]
        endtime = form.time[1]
    }
    getOrderExcel2(form.tab).then(res=>{
        
        res.data.order =  res.data.order.map(item=>{
            return {
                "buyer":item.buyer,
                "trade_status":item.trade_status,
                "final_payment": item.final_payment,
                "trade_id": item.trade_id,
                "shipping_time": item.shipping_time,
                "address": item.address,
                "order_details": item.order_details,
                "amount": item.order_details.map(item=>{
                    return item.amount;
                }),
                "product": item.order_details.map(item=>{
                    return item.product.name;
                }),
                "sku": item.order_details.map(item=>{
                    return item.cart_skus[0].value;
                }),
            }
        })
        json_data.value = res.data.order;
    })
}

defineExpose({
    open
})
</script>