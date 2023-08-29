<template>
    <el-drawer title="订单详情" v-model="dialogVisible" size="50%">
        <el-card shadow="never" class="mb-3">
            <template #header>
                <b class="text-sm">订单详情</b>
            </template>
            <el-form label-width="80px">
                <el-form-item label="订单号">
                   {{ info.trade_id }}
                </el-form-item>
                <el-form-item label="付款时间">
                     {{ info.shipping_time }}
                </el-form-item>
                <!-- <el-form-item label="创建时间">
                     {{ info.create_time }}
                </el-form-item> -->
            </el-form>
        </el-card>

        <el-card v-if="info.ship_data" shadow="never" class="mb-3">
            <template #header>
                <b class="text-sm">发货信息</b>
            </template>
            <el-form label-width="80px">
                <el-form-item label="物流公司">
                   {{ info.ship_data.express_company }}
                </el-form-item>
                <el-form-item label="运单号">
                    {{ info.ship_data.express_no }}
                    <el-button type="primary" text size="small" @click="openShipInfoModal(info.id)" class="ml-3" :loading="loading">查看物流</el-button>
                    
                </el-form-item>
                <el-form-item label="发货时间">
                    {{ ship_time }}
                </el-form-item>
            </el-form>
        </el-card>

        <el-card shadow="never" class="mb-3">
            <template #header>
                <b class="text-sm">商品信息</b>
            </template>
            <div class="flex mb-2" v-for="(item,index) in info.order_details" :key="index">
                <el-image :src="item.product?.image.url ?? ''" fit="fill" :lazy="true" style="width:60px;height:60px;"></el-image>
                <div class="ml-2 text-sm">
                    <p>{{ item.product?.name ?? '商品已被删除' }}</p>
                    <p v-if="item.cart_skus" class="mt-1">
                       <el-tag type="info" size="small">
                        {{ item.cart_skus[0].value }}
                       </el-tag>
                    </p>
                    <p>
                        <b class="text-rose-500 mr-2">￥{{ item.price }}</b>
                        <span class="text-xs text-gray-500">x{{ item.amount }}</span>
                    </p>
                </div>
            </div>
            <el-form label-width="80px">
                <el-form-item label="成交价">
                   <span class="text-rose-500 font-bold">￥{{ info.final_payment }}</span>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card shadow="never" v-if="info.address" class="mb-3">
            <template #header>
                <b class="text-sm">收货信息</b>
            </template>
            <el-form label-width="80px">
                <el-form-item label="收货人">
                   {{ info.address.name }}
                </el-form-item>
                <el-form-item label="联系方式">
                    {{ info.address.phone }}
                </el-form-item>
                <el-form-item label="收货地址">
                     {{ info.address.address + info.address.addres_detail }}
                </el-form-item>
            </el-form>
        </el-card>

        <el-card shadow="never" v-if="info.trade_status == '退款中'">
            <template #header>
                <b class="text-sm">退款信息</b>
                <el-button text disabled style="float: right;">{{ has_refund }}</el-button>
            </template>
            <el-form label-width="80px">
                <el-form-item label="退款理由">
                   {{ info?.refund?.reason }}
                </el-form-item>
                <el-form-item label="退款说明">
                   {{ info?.refund?.explain }}
                </el-form-item>
                <el-form-item label="附带图片">
                    <div class="flex mb-2">
                <el-image v-show="info?.refund?.image1?.url != null" :src="info?.refund?.image1?.url"  fit="cover" :preview-src-list="[info?.refund?.image1?.url]" :initial-index="0"
                class="w-[200px] h-[200px] rounded border mr-2">
              </el-image>
              <el-image v-show="info?.refund?.image2?.url != null" :src="info?.refund?.image2?.url" fit="cover" :preview-src-list="[info?.refund?.image2?.url]" :initial-index="0" 
                class="w-[200px] h-[200px] rounded border mr-2">
              </el-image><el-image v-show="info?.refund?.image3?.url != null" :src="info?.refund?.image3?.url" fit="cover" :preview-src-list="[info?.refund?.image3?.url]"  :initial-index="0"
                class="w-[200px] h-[200px] rounded border mr-2">
              </el-image>
            </div>
            <div class="flex mb-2">
                <el-image v-show="info?.refund?.image4?.url != null" :src="info?.refund?.image4?.url" fit="cover" :preview-src-list="[info?.refund?.image4?.url]"  :initial-index="0" 
                class="w-[200px] h-[200px] rounded border mr-2">
              </el-image>
              <el-image v-show="info?.refund?.image5?.url != null" :src="info?.refund?.image5?.url" fit="cover" :preview-src-list="[info?.refund?.image5?.url]"  :initial-index="0"
                class="w-[200px] h-[200px] rounded border mr-2">
              </el-image><el-image v-show="info?.refund?.image6?.url != null" :src="info?.refund?.image6?.url" fit="cover" :preview-src-list="[info?.refund?.image6?.url]" :initial-index="0" 
                class="w-[200px] h-[200px] rounded border mr-2">
              </el-image>
            </div>
                </el-form-item>
            </el-form>
        </el-card>
    </el-drawer>

    <ShipInfoModal ref="ShipInfoModalRef" />
</template>
<script setup>
import { ref,computed } from "vue"
import {  useDateFormat } from '@vueuse/core'
import ShipInfoModal from "./ShipInfoModal.vue"
const props = defineProps({
    info:Object
})
const ship_time = computed(()=>{
    if(props.info.ship_data){
        const s = useDateFormat(props.info.ship_data.express_time * 1000,'YYYY-MM-DD HH:mm:ss')
        return s.value
    }
    return ""
})

const refund_status = computed(()=>{
    const opt = {
        pending:"未退款",
        applied:"已申请，等待审核",
        processing:"退款中",
        success:"退款成功",
        failed:"退款失败"
    }
    return props.info.refund_status ? opt[props.info.refund_status] : ""
})

const dialogVisible = ref(false)

const open = ()=>{
    dialogVisible.value = true
    console.log(props.info)
}

const ShipInfoModalRef = ref(null)
const loading = ref(false)
// const openShipInfoModal = (id)=>{
//     loading.value = true
//     ShipInfoModalRef.value.open(id).finally(()=>loading.value = false)
// }

defineExpose({
    open
})
</script>