export async function getOrder(limit,offset,trade_id,trade_status){
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "query ($limit: Int, $offset: Int, $trade_id: String,$trade_status: String,$tj: String,$VIP:String) {\r\n  order(\r\n    limit: $limit\r\n    offset: $offset\r\n    where: {\r\n      _and: [\r\n        { trade_id: { _ilike: $trade_id } }\r\n        { trade_status: { _like: $trade_status } }\r\n  { trade_status: { _neq: $tj } }  { trade_status: { _neq: $VIP } }  ]\r\n    }\r\n    order_by: [{ id: desc_nulls_last }]\r\n  ) {\r\n    id\r\n    buyer\r\n    trade_status\r\n    final_payment\r\n    shipping_time\r\n    trade_id\r\n transactionid_payment_transaction\r\n account{\r\n id\r\n }  order_details {\r\n      id\r\n      order_order\r\n      oder_id\r\n      price\r\n      amount\r\n      final_payment\r\n      has_refund\r\n      order_status\r\n      cart_skus {\r\n        id\r\n        value\r\n      }\r\n      product {\r\n        id\r\n        name\r\n        description\r\n        image {\r\n          id\r\n          url\r\n        }\r\n      }\r\n    }\r\n    order_details_aggregate {\r\n      aggregate {\r\n        count\r\n      }\r\n    }\r\n\r\n  refund{product_status reason explain image1 {\r\n      url\r\n      id\r\n    }\r\n    image2 {\r\n      url\r\n      id\r\n    }\r\n    image3 {\r\n      url\r\n      id\r\n    }\r\n    image4 {\r\n      url\r\n      id\r\n    }\r\n    image5 {\r\n      url\r\n      id\r\n    }\r\n    image6 {\r\n      url\r\n      id\r\n    }\r\n    }  address {\r\n      id\r\n      name\r\n      phone\r\n      address\r\n      addres_detail\r\n      coordinate\r\n      personal_personal\r\n      family_family\r\n      is_select\r\n      province\r\n      city\r\n      district\r\n      order_ids {\r\n        id\r\n      }\r\n    }\r\n  }\r\n}",
  variables: {"limit":limit,"offset":offset,"trade_id":trade_id,"trade_status":trade_status,"tj":"体检","VIP":"VIP"}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};

 const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions);
 const result = await response.json();
 
  result.list = result.data.order;
 return result;
}

export async function deleteOrders(ids){
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "mutation ($ids: [bigint!]) {\n  delete_order(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
  variables: {"ids":ids}
  })
  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
  };
  const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
  const result = await response.json();
   
  return result;
  }

  export async function getOrderExcel(trade_status){
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "query ($trade_status: String) {\r\n  order(\r\n    where: {\r\n      _and: [\r\n        { trade_status: { _like: $trade_status } }\r\n      ]\r\n    }\r\n    order_by: [{ id: desc_nulls_last }]\r\n  ) {\r\n    id\r\n    buyer\r\n    trade_status\r\n    final_payment\r\n    shipping_time\r\n    trade_id\r\n    order_details {\r\n      id\r\n      order_order\r\n      oder_id\r\n      price\r\n      amount\r\n      final_payment\r\n      has_refund\r\n      order_status\r\n      cart_skus {\r\n        id\r\n        value\r\n      }\r\n      product {\r\n        id\r\n        name\r\n        description\r\n        image {\r\n          id\r\n          url\r\n        }\r\n      }\r\n    }\r\n    order_details_aggregate {\r\n      aggregate {\r\n        count\r\n      }\r\n    }\r\n\r\n    address {\r\n      id\r\n      name\r\n      phone\r\n      address\r\n      addres_detail\r\n      coordinate\r\n      personal_personal\r\n      family_family\r\n      is_select\r\n      province\r\n      city\r\n      district\r\n      order_ids {\r\n        id\r\n      }\r\n    }\r\n  }\r\n}",
  variables: {"trade_status":trade_status}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow',
  responseType: 'blob'
};

 const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions);
 console.log(response)
 const result = await response.blob();
 
 return result;
}

export async function getOrderExcel2(trade_status){
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
query: "query ($trade_status: String) {\r\n  order(\r\n    where: {\r\n      _and: [\r\n        { trade_status: { _like: $trade_status } }\r\n      ]\r\n    }\r\n    order_by: [{ id: desc_nulls_last }]\r\n  ) {\r\n    id\r\n    buyer\r\n    trade_status\r\n    final_payment\r\n    shipping_time\r\n    trade_id\r\n    order_details {\r\n      id\r\n      order_order\r\n      oder_id\r\n      price\r\n      amount\r\n      final_payment\r\n      has_refund\r\n      order_status\r\n      cart_skus {\r\n        id\r\n        value\r\n      }\r\n      product {\r\n        id\r\n        name\r\n        description\r\n        image {\r\n          id\r\n          url\r\n        }\r\n      }\r\n    }\r\n    order_details_aggregate {\r\n      aggregate {\r\n        count\r\n      }\r\n    }\r\n\r\n    address {\r\n      id\r\n      name\r\n      phone\r\n      address\r\n      addres_detail\r\n      coordinate\r\n      personal_personal\r\n      family_family\r\n      is_select\r\n      province\r\n      city\r\n      district\r\n      order_ids {\r\n        id\r\n      }\r\n    }\r\n  }\r\n}",
variables: {"trade_status":trade_status}
})
var requestOptions = {
method: 'POST',
headers: myHeaders,
body: graphql,
redirect: 'follow',
};

const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions);
const result = await response.json();

return result;
}

export async function updateOrder(id,objects){
  objects.trade_status = '待收货';
  console.log(objects)
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "mutation ($id: bigint!,$objects:order_set_input) {\r\n  update_order(_set: $objects , where: {id: {_eq: $id}}) {\r\n    affected_rows\r\n  }\r\n}",
  variables: {"id":id,"objects": objects}
  })
  
  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
  };
  const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
const result = await response.json();
return result;
}

export async function searchOrder(id){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "query findFzPaymentByPaymentTransactionId($paymentTransactionId:bigint) {\r\n         fz_payment(\r\n            where: {order_id:{_eq: $paymentTransactionId\r\n}}\r\n            limit: 1\r\n          ) {\r\n            id\r\n            status\r\n            transaction_id\r\n          }\r\n        }  ",
  variables: {"paymentTransactionId":id}
  })
  
  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
  };
  const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
const result = await response.json();
console.log(result)
 
return result;
}

export async function refund(id){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "mutation refund($type:PaymentType, $paymentId:Long!){\r\n         refund(type: $type, paymentId:$paymentId )\r\n        }  ",
  variables: {"type":"WECHATPAY_MINIPROGRAM","paymentId":id}
  })
  
  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
  };
  const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
const result = await response.json();

 
return result;
}


export async function updatePaymentTransaction(id){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "mutation updatePaymentTransaction($id: bigint, $status:String){\r\n      update_payment_transaction(_set: {status:$status}, where: {id:{_eq:$id}}) {\r\n        affected_rows\r\n        returning {\r\n          id\r\n          status\r\n          order_id\r\n          payment_method\r\n        }\r\n      }\r\n    }\r\n ",
  variables: {"status":"REFUND_SUCCEEDED","id":id}
  })
  
  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
  };
  const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
const result = await response.json();
return result;
}

export async function updateRefundOrder(id,trade_status,has_refund){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "mutation ($trade_status: String,$has_refund: String, $id: bigint!) {\n  update_order(_set: {trade_status: $trade_status,has_refund: $has_refund}, where: {id: {_eq: $id}}) {\n    affected_rows\n  }\n}\n"  ,
  variables: {"id":id,"trade_status": trade_status,"has_refund":has_refund}
  })
  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
  };
  const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
const result = await response.json();
return result;
}

export async function getHadPaymentOrder(limit,offset,payment_status){
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
query: "query ($limit: Int, $offset: Int,$payment_status: String) {\r\n  order(\r\n    limit: $limit\r\n    offset: $offset\r\n    where: {\r\n      _and: [\r\n        { payment_status: { _like: $payment_status } }\r\n      ]\r\n    }\r\n    order_by: [{ id: desc_nulls_last }]\r\n  ) {\r\n    id\r\n  final_payment\r\n }\r\n}",
variables: {"limit":limit,"offset":offset,"payment_status":payment_status}
})
var requestOptions = {
method: 'POST',
headers: myHeaders,
body: graphql,
redirect: 'follow'
};

const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions);
const result = await response.json();

result.list = result.data.order;
return result;
}


export async function refuseRefund(id,value){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "mutation ($refuse_refund: String, $id: bigint!) {\n  update_refund_application(\n    _set: {refuse_refund: $refuse_refund}\n    where: {order_order: {_eq: $id}}\n  ) {\n    affected_rows\n  }\n}\n",
  variables: {"refuse_refund":value,"id":id}
  })
  
  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
  };
  const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
const result = await response.json();
return result;
}