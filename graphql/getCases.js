export async function getCases(limit,offset,name){
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "query ($limit: Int, $offset: Int,$name:String) {\r\n  cases(\r\n    limit: $limit\r\n    offset: $offset\r\n    where: {_and: [{account: {ud_personal_cec0ba: {name: {_ilike: $name}}}}]}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    ud_account_zhanghu_e12a22\r\n    description\r\n    image1 {\r\n      url\r\n      id\r\n    }\r\n    image2 {\r\n      url\r\n      id\r\n    }\r\n    image3 {\r\n      url\r\n      id\r\n    }\r\n    image4 {\r\n      url\r\n      id\r\n    }\r\n    image5 {\r\n      url\r\n      id\r\n    }\r\n    image6 {\r\n      url\r\n      id\r\n    }\r\n    solution {\r\n      solution\r\n      id\r\n    }\r\n    solution {\r\n      solution\r\n      cases_cases\r\n  status\r\n   }\r\n    account {\r\n  username\r\n  profile_image{\r\n url\r\n }   id\r\n      ud_personal_cec0ba{\r\n      name\r\n      phone\r\n      gender\r\n      age\r\n      }\r\n    }\r\n  }\r\n  cases_aggregate(where: {_and: []}) {\r\n    aggregate {\r\n      count\r\n    }\r\n  }\r\n}",
  variables: {"limit":limit,"offset":offset,"name":name}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};

 const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions);
 const result = await response.json();
 
  result.list = result.data.cases;
 return result;
}
export async function deleteCases(ids){
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "mutation ($ids: [bigint!]) {\n  delete_cases(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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

  export async function createSolution(objects) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
  
    var graphql = JSON.stringify({
      query: "mutation ($objects: [solution_insert_input!]!) {\n  insert_solution(objects: $objects) {\n    affected_rows\n  }\n}\n",
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

  export async function updateSolution(id,objects){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
    
    var graphql = JSON.stringify({
    query: "mutation ($id: bigint!,$objects:solution_set_input) {\r\n  update_solution(_set: $objects , where: {id: {_eq: $id}}) {\r\n    affected_rows\r\n  }\r\n}",
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