export async function getMember(limit,offset,username){
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "query ($limit: Int, $offset: Int,$username:String) {\r\n  member(\r\n    limit: $limit\r\n    offset: $offset\r\n    where: {_and: [{account_id: {username: {_ilike: $username}}}]}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    consumption\r\n  rechange\r\n   ud_account_id_zhanghu_1c106d\r\n    status\r\n    level_member_level\r\n    account_id {\r\n is_write invitees{ud_invitee_zhanghu_4344e7}    id\r\n      username\r\n  profile_image{\r\n url\r\n  }    ud_personal_cec0ba{\r\n    name\r\n    phone\r\n        address\r\n  gender\r\n    }\r\n    }\r\n    level {\r\n      id,\r\n      level_name\r\n    }\r\n  }\r\n  member_aggregate{\r\n    aggregate {\r\n      count\r\n    }\r\n  }\r\n}",
  variables: {"limit":limit,"offset":offset,"username":username}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};

 const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions);
 const result = await response.json();
 
  result.list = result.data.member;
 return result;
}

export async function deleteMember(ids){
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "mutation ($ids: [bigint!]) {\n  delete_member(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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

  export async function updateStatus(status,id){
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "mutation ($status: Boolean, $id: bigint!) {\r\n  update_account(\r\n    _set: {is_write: $status}\r\n    where: {member: {id: {_eq: $id}}}\r\n  ) {\r\n    affected_rows\r\n  }\r\n}",
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
   
  return result;
  }


  export async function updateMember(id,body){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
    
    var graphql = JSON.stringify({
    query: "mutation ($level_member_level: bigint, $id: bigint!,$consumption:Decimal,$rechange:Decimal) {\n  update_member(\n    _set: {level_member_level: $level_member_level,consumption:$consumption,rechange:$rechange}\n    where: {id: {_eq: $id}}\n  ) {\n    affected_rows\n  }\n}\n",
    variables: {"id":id,"level_member_level":body.level_member_level,"consumption":body.consumption,"rechange":body.rechange}
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

  