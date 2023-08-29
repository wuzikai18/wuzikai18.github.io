export async function getAppointment(limit,offset,staff,store){
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "query ($limit: Int, $offset: Int) {\r\n  withdrawal_requests(\r\n    limit: $limit\r\n    offset: $offset\r\n    order_by: [{id: desc_nulls_last}]\r\n    where: {_and: []}\r\n  ) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    ud_user_id_zhanghu_667156\r\n    amount_requested\r\n    ud_status_b60ec8\r\n    ud_review_comment_5b8fec\r\n    phone\r\n    bank_card_number\r\n    user_id{\r\n      id\r\n      username\r\n    }\r\n    record {\r\n      id\r\n    }\r\n  }\r\n  withdrawal_requests_aggregate(where: {_and: []}) {\r\n    aggregate {\r\n      count\r\n    }\r\n  }\r\n}",
  variables: {"limit":limit,"offset":offset,"staff":staff,"store":store}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};

 const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions);
 const result = await response.json();
 
  result.list = result.data.withdrawal_requests;
 return result;
}

export async function updateAdvise(id, objects) {
    objects.ud_status_b60ec8 = "已拒绝"
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
    query: "mutation ($id: bigint!,$objects:withdrawal_requests_set_input) {\r\n  update_withdrawal_requests(_set: $objects , where: {id: {_eq: $id}}) {\r\n    affected_rows\r\n  }\r\n}",
    variables: { "id": id, "objects": objects }
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


export async function updateStatus(status,id,amount,user_id){
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "mutation ($status: String, $id: bigint!) {\n  update_withdrawal_requests(_set: {ud_status_b60ec8: $status}, where: {id: {_eq: $id}}) {\n    affected_rows\n  }\n}\n",
  variables: {"status":status,"id":id}
  })
  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
  };
  
  const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
  const result = await response.json();
  deletRecord([id]);
  createRecord([{amount_withdrawn:amount,request_withdrawal_requests:id,ud_user_id_zhanghu_1ce4d2:user_id}])
   
  return result;
  }

  export async function deletRecord(ids){
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "mutation ($ids: [bigint!]) {\n  delete_withdrawal_records(where: {request_withdrawal_requests: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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

export async function createRecord(objects) { 
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
  
    var graphql = JSON.stringify({
      query: "mutation ($objects: [withdrawal_records_insert_input!]!) {\n  insert_withdrawal_records(objects: $objects) {\r\n    affected_rows\r\n    returning{\r\n      id\r\n    }\n}\n}\n",
      variables: { "objects": objects }
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


export async function deleteAppointments(ids){
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "mutation ($ids: [bigint!]) {\n  delete_appointment(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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


export async function getOrderExcel2(trade_status,store){
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
    query: "query ($staff: String,$store:String) {\r\n  appointment(\r\n   where: {_and: [{project: {staff: {name: {_like: $staff}}}},{project: {staff: {store: {name:{_like: $store}}}}}]}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    personal_personal\r\n    family_family\r\n    date\r\n    time\r\n    project_staff_project\r\n    time2\r\n    personal {\r\n      id\r\n      name\r\n      phone\r\n      age\r\n      gender\r\n      idcard_number\r\n    }\r\n    family {\r\n      id\r\n      name\r\n      phone\r\n      age\r\n      gender\r\n      idcard_number\r\n    }\r\n    project {\r\n      id\r\n      project{\r\n        name\r\n      }\r\n      staff{\r\n        name\r\n  store{\r\n name\r\n }    }\r\n    }\r\n  }\r\n  appointment_aggregate(where: {_and: []}) {\r\n    aggregate {\r\n      count\r\n    }\r\n  }\r\n}\r\n",
variables: {"staff":trade_status,"store":store}
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





export async function updateFlie(fileId,id){
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
query: "mutation ($fileId: bigint, $id: bigint!,$status:String,$is_file:bigint) {\n  update_appointment(_set: {ud_reportfile_720497_id: $fileId,status:$status, is_file:$is_file}, where: {id: {_eq: $id}}) {\n    affected_rows\n  }\n}\n",
variables: {"fileId":fileId,"id":id,"status":"已就诊","is_file":1}
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
