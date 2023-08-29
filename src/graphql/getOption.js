

export async function getAddproject(limit, offset, test) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "query ($limit: Int, $offset: Int,$test: String, $order_by: [question_order_by!] ) {\r\n  question(limit: $limit, offset: $offset, order_by: $order_by, where: {test: {title:{_like: $test}}}) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    title\r\n    test_test\r\n    test{\r\n      id\r\n      title\r\n    }\r\n    options {\r\n      id\r\n      title\r\n    }\r\n  }\r\n}",
        variables: { "limit": null, "offset": offset, "test": test }
    })
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };

    const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
    const result = await response.json();
    result.list = result.data.question

    return result;
}

export async function createProduct(objects) {
    let categoryList = objects[0].categoryList;
    delete objects[0].categoryList;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($objects: [question_insert_input!]!) {\n  insert_question(objects: $objects) {\r\n    affected_rows\r\n    returning{\r\n      id\r\n    }\n}\n}\n",
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
      const objects = [{title:e,question_question:result.data.insert_question.returning[0].id}]
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
        query: "mutation ($objects: [options_insert_input!]!) {\n  insert_options(objects: $objects) {\r\n    affected_rows\r\n    returning{\r\n      id\r\n    }\n}\n}\n",
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
        query: "mutation ($ids: [bigint!]) {\n  delete_options(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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

export async function updateProduct(id, objects) {
    let categoryList = objects.categoryList;
    delete objects.categoryList
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($id: bigint!,$objects:question_set_input) {\r\n  update_question(_set: $objects , where: {id: {_eq: $id}}) {\r\n    affected_rows\r\n  returning{\r\n      id\r\n    }\n }\r\n}",
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

    categoryList = categoryList.split(",");
    getOptions(99,0,id).then((res)=>{
        let ids = res.map((o) => {
            return {
                id:o.id,
                title:o.title
            }
        });
        //deleteAddproject
        const deleteAddprojectIds = ids.filter((o) => !categoryList.includes(o.title)).map(o=>o.id);
        if(deleteAddprojectIds.length>0){
            deleteStaff(deleteAddprojectIds);
        }
        const createAddproject = categoryList.filter((title) => !ids.map(o=>o.title).includes(title));
        console.log(deleteAddprojectIds,createAddproject,ids,categoryList)
        if(createAddproject.length>0){
            for (let i = 0; i < createAddproject.length; i++) {
                const object = [{title:createAddproject[i],question_question:result.data.update_question.returning[0].id}]
                createStaff(object)
            }
        }
    })

    return result;
}

export async function getOptions(limit,offset,id){
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "query ($limit: Int, $offset: Int,$id: bigint, $order_by: [options_order_by!] ) {\r\n  options(limit: $limit, offset: $offset, order_by: $order_by, where: {question_question: {_eq: $id}}) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    title\r\n    question_question\r\n   \r\n  }\r\n}" ,
  variables: {"limit":limit,"offset":offset,"id":id}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};  
const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
 const result = await response.json();
  result.list = result.data.options
 return result.list;
}


export async function getAddproject2(limit, offset, name) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "query ($limit: Int, $offset: Int, $name:String) {\r\n  add_project(limit: $limit, offset: $offset, order_by: [{id: desc_nulls_last}], where: {\r\n  _and: [\r\n    {\r\n      title: {\r\n  _eq: $name       }\r\n    }\r\n  ]\r\n}) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    title\r\n    sub_title\r\n    price\r\n    category_add_project_categray\r\n store{id name} store_store   projects {\r\n      id\r\n    }\r\n     }\r\n  add_project_aggregate {\r\n    aggregate {\r\n      count\r\n    }\r\n  } \r\n}\r\n",
        variables: { "limit": null, "offset": offset, "name": name }
    })
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };

    const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
    const result = await response.json();
    result.list = result.data.add_project

    return result;
}


export async function deleteProduct(ids) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($ids: [bigint!]) {\n  delete_question(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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










