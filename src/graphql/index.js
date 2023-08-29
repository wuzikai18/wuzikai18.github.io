import { getOrder ,getHadPaymentOrder} from '~/graphql/getOrder'
import { getMember } from '~/graphql/getMember'
import { reactive ,ref} from 'vue';

export async function getStatistics1(limit, offset) {
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    // myHeaders.append("Content-Type", "application/json");

    // var graphql = JSON.stringify({
    //     query: "query ($limit: Int, $offset: Int) {\r\n  panels(\r\n    limit: $limit\r\n    offset: $offset\r\n    where: {_and: []}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n    ud_subtitle_8b0c29\r\n    ud_subunit_54eb0a\r\n    ud_subvalue_c19fa1\r\n    title\r\n    unit\r\n    ud_unitcolor_7892a9\r\n    value\r\n  }\r\n  panels_aggregate(where: {_and: []}) {\r\n    aggregate {\r\n      count\r\n    }\r\n  }\r\n}\r\n",
    //     variables: { "limit": limit, "offset": offset }
    // })
    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: graphql,
    //     redirect: 'follow'
    // };

    // const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
    // const result = await response.json();
    // result.data.panels = result.data.panels.map((o => {
    //     return {
    //         subTitle: o.ud_subtitle_8b0c29,
    //         subUnit: o.ud_subunit_54eb0a,
    //         subValue: o.ud_subvalue_c19fa1,
    //         title: o.title,
    //         unit: o.unit,
    //         unitColor: o.ud_unitcolor_7892a9,
    //         value: o.value
    //     }
    // }))
    const result = reactive({
        data:{
            panels:[]
        }
    });
    result.data.panels = reactive([{
        subTitle: "总用户",
        subUnit: "人",
        subValue: null,
        title: "总用户",
        unit: "总",
        unitColor: "warning",
        value: null
},{
        subTitle: "总销售额",
        subUnit: "元",
        subValue: null,
        title: "总销售额",
        unit: "元",
        unitColor: "",
        value: null
},{
    subTitle: "转化率",
    subUnit: "%",
    subValue: null,
    title: "订单量",
    unit: "总",
    unitColor: "danger",
    value: null
},{
    subTitle: "总支付订单",
    subUnit: "",
    subValue: null,
    title: "支付订单",
    unit: "总",
    unitColor: "success",
    value: null
}]);
Promise.all([getMember().then((res) => {
    result.data.panels[0].subValue = res.list.length;
    result.data.panels[0].value = res.list.length;
}),getHadPaymentOrder(null, null, 'SUCCESSFUL').then((res) => {
    let num = ref(null)
    for(let i = 0;i<res.list.length;i++){
        num.value += res.list[i].final_payment
    }
    result.data.panels[1].subValue = num.value.toFixed(2)
    result.data.panels[1].value = num.value.toFixed(2)
}),getOrder().then((res) => {
    // result.data.panels[2].subValue = res.list.length;
    result.data.panels[2].value = res.list.length;
    getHadPaymentOrder(null, null, 'SUCCESSFUL').then((res) => {
        result.data.panels[3].subValue = res.list.length
        result.data.panels[3].value = res.list.length
        result.data.panels[2].subValue = ((res.list.length / result.data.panels[2].value)*100).toFixed(2)
    })
})]).finally(()=>{

})

    return result;
}

export async function getStatistics2() {
    let res = reactive({})
    let order_value1 = null;
    let order_value2 = null;
    let order_value3 = null;
    let order_value4 = null;
    let goods_value1 = null;
    let goods_value2 = null;
    let goods_value3 = null;
    let result = reactive({
        data:{
            goods:[
                {label:'全部商品',value:goods_value1},
                {label:'已上架',value:goods_value2},
                {label:'未上架',value:goods_value3}
            ],
            order:[
                {label:'待付款',value:order_value1},
                {label:'待发货',value:order_value2},
                {label:'待收货',value:order_value3},
                {label:'退款中',value:order_value4}
            ]
        }
    })
     Promise.all([getOrder(null, null, '%%', '待支付').then((res) => {
        result.data.order[0].value = res.list.length
    }),getOrder(null, null, '%%', '待发货').then((res) => {
        result.data.order[1].value = res.list.length
    }),getOrder(null, null, '%%', '待收货').then((res) => {
        result.data.order[2].value = res.list.length
    }),getOrder(null, null, '%%', '退款中').then((res) => {
        result.data.order[3].value = res.list.length
    }),getProduct(null).then((res) => {
        result.data.goods[0].value = res.list.length
    }),getProduct(true).then((res) => {
        result.data.goods[1].value = res.list.length
    }),getProduct(false).then((res) => {
        result.data.goods[2].value = res.list.length
    })]).finally(()=>{
    
    })
    return result.data;
}


export async function getProduct(is_show) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "query ($is_show:Boolean) {\r\n  product(\r\n    limit: null\r\n    offset: null\r\n    where: {_and: [{ is_show: { _eq: $is_show }}]}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n  is_show\r\n  }\r\n}",
        variables: { "is_show": is_show }
    })
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };

    const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
    const result = await response.json();
    result.list = result.data.product

    return result;
}