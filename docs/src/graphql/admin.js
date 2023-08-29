var id = null

export async function getinfo(){
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "query {\r\n  admin(\r\n    limit: null\r\n    offset: null\r\n    where: { menus: { status: { _eq: 1 } } }\r\n  ) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    avatar {\r\n      url\r\n      id\r\n    }\r\n    super\r\n    username\r\n    menus(\r\n      where: { status: { _eq: 1 } }\r\n    ) {\r\n      id\r\n      condition\r\n      created_at\r\n      desc1\r\n      frontpath\r\n      icon\r\n      menu\r\n      method\r\n      name\r\n      order\r\n      rule_id\r\n      status\r\n      updated_at\r\n      child(\r\n        where: { status: { _eq: 1 } }\r\n      ) {\r\n        id\r\n        condition\r\n        created_at\r\n        desc1\r\n        frontpath\r\n        icon\r\n        menu_menus\r\n        method\r\n        name\r\n        order\r\n        rule_id\r\n        status\r\n        updated_at\r\n      }\r\n    }\r\n    role {\r\n      id\r\n    }\r\n  }\r\n}\r\n",
  variables: {}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};  
const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
 const result = await response.json();
id = result.data.admin[0].id;

 return result.data.admin[0];
}

export async function login(username,password){
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
query: "query ($username:String,$password:String) {\r\n  admin(\r\n    limit: null\r\n    offset: null\r\n    where: {_and: [{username: {_eq: $username}},{password:{_eq:$password}}]}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n    username\r\n    password\r\n  }\r\n  admin_aggregate(where: {_and: [{username: {_eq: $username}}]}) {\r\n    aggregate {\r\n      count\r\n    }\r\n  }\r\n}",
variables: {'username':username,'password':password}
})
var requestOptions = {
method: 'POST',
headers: myHeaders,
body: graphql,
redirect: 'follow'
};  
const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
const result = await response.json();

if(result.data.admin.length > 0 ){
  result.token = '06e216f58eabeb53a76cfedbb975bc3abb723a51'
  result.msg = 'ok'
  return result;
}else{
  result.errorCode = 20000;
  result.msg = '用户名或者密码错误';
  return result;
}

}

export async function updatePassword(password){
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
query: "mutation ($password: String, $id: bigint!) {\n  update_admin(_set: {password: $password}, where: {id: {_eq: $id}}) {\n    affected_rows\n  }\n}\n",
variables: {"password":password,"id":id}
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