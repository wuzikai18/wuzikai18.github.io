export async function getStorePayment(limit, offset) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
  
    var graphql = JSON.stringify({
      query: "query ($limit: Int, $offset: Int) {\r\n  store(\r\n    limit: $limit\r\n    offset: $offset\r\n    where: {_and: []}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n    id\r\n    registration_fee\r\n    advance_payment\r\n  }\r\n}",
      variables: { "limit": limit, "offset": offset}
    })
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow'
    };
  
    const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
    const result = await response.json();
    result.list = result.data.store
  
    return result;
  }

  export async function updateStorePayment(objects){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
    
    var graphql = JSON.stringify({
    query: "mutation ($id:bigint,$objects: store_set_input) {\r\n  update_store(_set: $objects , where: {_and: [{id: {_lt: $id}}]}) {\r\n    affected_rows\r\n  }\r\n}",
    variables: {"id":4,"objects": objects}
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


  export async function getstore(limit,offset){
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "query ($limit: Int, $offset: Int, $order_by: [store_order_by!], $where: store_bool_exp) {\r\n  store(limit: $limit, offset: $offset, order_by: $order_by, where: $where) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    name\r\n    addres_detail\r\n    coordinate\r\n    telephone\r\n    image {\r\n      url(option: {resize: {width: 500, height: 500}})\r\n      id\r\n    }\r\n    status\r\n    agent_admin\r\n    qr_code {\r\n      url(option: {resize: {width: 500, height: 500}})\r\n      id\r\n    }\r\n    registration_fee\r\n    advance_payment\r\n    city\r\n    level\r\n    basic_price\r\n    sale_num\r\n    staffs {\r\n      id\r\n   name\r\n }\r\n  }\r\n\r\n  store_aggregate {\r\n    aggregate {\r\n      count\r\n    }\r\n  }\r\n\r\n}",
  variables: {"limit":limit,"offset":offset}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};  
const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
 const result = await response.json();
  result.list = result.data.store
 return result;
}
export async function deletestore(ids){
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "mutation ($ids: [bigint!]) {\n  delete_store(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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

export async function createstore(objects) {
    delete objects[0].imageUrl
    let categoryList = objects[0].categoryList;
    delete objects[0].categoryList
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
  
    var graphql = JSON.stringify({
      query: "mutation ($objects: [store_insert_input!]!) {\n  insert_store(objects: $objects) {\r\n    affected_rows\r\n    returning{\r\n      id\r\n    }\n}\n}\n",
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
    categoryList = categoryList.split(",");
    console.log(result,'result',categoryList)
    categoryList.forEach(e => {
      const objects = [{name:e,store_store:result.data.insert_store.returning[0].id}]
      createStaff(objects);
    });
  
    return result;
  }

  export async function updatestore(id, objects) {
    delete objects.imageUrl
    let categoryList = objects.categoryList;
    delete objects.categoryList
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
  
    var graphql = JSON.stringify({
      query: "mutation ($id: bigint!,$objects:store_set_input) {\r\n  update_store(_set: $objects , where: {id: {_eq: $id}}) {\r\n    affected_rows\r\n  returning{\r\n      id\r\n    }\n}\r\n}",
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
    console.log(result,'result')
    await deleteStaff([result.data.update_store.returning[0].id])
    categoryList = categoryList.split(",");
    categoryList.forEach(e => {
      const objects = [{name:e,store_store:result.data.update_store.returning[0].id}]
      createStaff(objects);
    });
  
  
    return result;
  }

  export async function createStaff(objects) {
    console.log(objects,'objects')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($objects: [staff_insert_input!]!){\r\n          insert_staff(objects: $objects on_conflict: {\r\n                  constraint: unique_staff_lkfdgq7s,\r\n                  update_columns: [name]\r\n                } ) \r\n    {\r\n        __typename\r\n        \r\n              returning {\r\n                id\r\n              }\r\n            \r\n      }\r\n        }",
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

export async function deleteStaff(ids) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");

  var graphql = JSON.stringify({
      query: "mutation ($ids: [bigint!]) {\n  delete_staff(where: {store_store: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
      variables: { "ids": ids }
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