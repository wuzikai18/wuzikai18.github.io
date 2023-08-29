export async function getOpinion(limit,offset,name){
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "query ($limit: Int, $offset: Int,$name:String) {\r\n  opinion(\r\n    limit: $limit\r\n    offset: $offset\r\n    where: {_and: [{account: {ud_personal_cec0ba: {name: {_ilike: $name}}}}]}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    description\r\n    image1 {\r\n      url\r\n      id\r\n    }\r\n    image2 {\r\n      url\r\n      id\r\n    }\r\n    image3 {\r\n      url\r\n      id\r\n    }\r\n    image4 {\r\n      url\r\n      id\r\n    }\r\n    image5 {\r\n      url\r\n      id\r\n    }\r\n    image6 {\r\n      url\r\n      id\r\n    }\r\n    ud_account_zhanghu_a8074a\r\n    images {\r\n      id\r\n    }\r\n    account {\r\n      profile_image{\r\n        url\r\n      }\r\n      username\r\n      id\r\n      ud_personal_cec0ba{\r\n        name\r\n        gender\r\n        age\r\n        phone\r\n      }\r\n    }\r\n    \r\n  }\r\n  opinion_aggregate(where: {_and: []}) {\r\n    aggregate {\r\n      count\r\n    }\r\n  }\r\n}",
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
 
  result.list = result.data.opinion;
 return result;
}

export async function deleteOpinion(ids){
    var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
  myHeaders.append("Content-Type", "application/json");
  
  var graphql = JSON.stringify({
  query: "mutation ($ids: [bigint!]) {\n  delete_opinion(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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