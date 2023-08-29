//import { getStaff } from '~/graphql/getStaff'

export async function getProduct(limit, offset, name) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: " query ($limit: Int, $offset: Int,$name:String) {\r\n  project(limit: $limit, offset: $offset, order_by: [{id: desc_nulls_last}], where: {_and: [{ name: { _ilike: $name }}]}) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    name\r\n    image {\r\n      url(option: {resize: {width: 500, height: 500}})\r\n      id\r\n    }\r\n    description\r\n    notice {\r\n      url(option: {resize: {width: 500, height: 500}})\r\n      id\r\n    }\r\n    daily_limit\r\n    price\r\n    sale_num\r\n    staffs {\r\n      id\r\n      staff_staff\r\n      staff{\r\n        id\r\n        name\r\n        store{\r\n          name\r\n        }\r\n      }\r\n    }\r\n    tags {\r\n      id\r\n    }\r\n    detail_images {\r\n      id\r\n      title\r\n  type\r\n    image{\r\n        id\r\n        url\r\n      }\r\n      type\r\n    }\r\n    add_projects {\r\n      id\r\n      project_project\r\n      add_project{\r\n        id\r\n        title\r\n      }\r\n    }\r\n  }\r\n}\r\n",
        variables: { "limit": limit, "offset": offset, "name": name }
    })
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };

    const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
    const result = await response.json();
    result.list = result.data.project

    return result;
}
export async function getStaff(limit, offset, name) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "query ($limit: Int, $offset: Int,$name:String) {\r\n  staff(\r\n    limit: $limit\r\n    offset: $offset\r\n    where: {_and: [\r\n   { name: { _ilike: $name } }\r\n,{ store: { _not: null } } ]}\r\n    order_by: [{idx: asc_nulls_last}]\r\n  ) {\r\n    id\r\n    name\r\n  store { id\r\n name\r\n } }\r\n  staff_aggregate(where: {_and: []}) {\r\n    aggregate {\r\n      count\r\n    }\r\n  }\r\n}",
        variables: { "limit": limit, "offset": offset, "name": name }
    })
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };

    const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions);
    const result = await response.json();

    result.list = result.data.staff;
    return result;
}

export async function deleteProduct(ids) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($ids: [bigint!]) {\n  delete_project(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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

export async function updateProductStatus(status, id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($is_show: Boolean, $id: bigint!) {\n  update_project(\n    _set: {is_show: $is_show}\n    where: {id: {_eq: $id}}\n  ) {\n    affected_rows\n  }\n}\n",
        variables: { "is_show": status, "id": id }
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

export async function createProduct(objects) {
    let addProject = objects[0].addProject;
    let category = objects[0].category;
    let categoryArr = category.split(",")
    let images1 = objects[0].fileList1?.[0];
    let images2 = objects[0].fileList2;
    let images3 = objects[0].fileList3;
    delete objects[0].imageUrl;
    delete objects[0].fileList1;
    delete objects[0].fileList2;
    delete objects[0].fileList3;
    delete objects[0].addProject;
    delete objects[0].category;
    objects[0].notice_id=images1?.name??null;
    objects[0].sale_num = 0;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($objects: [project_insert_input!]!) {\n  insert_project(objects: $objects) {\r\n    affected_rows\r\n    returning{\r\n      id\r\n    }\n}\n}\n",
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
    console.log(result,'result')
     let result_id = result.data.insert_project.returning[0].id;
    const object = [{ "project_project": result_id, "add_project_add_project": null}]
    for (let i = 0; i < addProject.length; i++) {
        object[0].add_project_add_project = addProject[i]
        createProductSkus(object)
    }
    const imageObject = [{ image_id: null, project_project: result_id,title:null,type:null }]
    // for (let i = 0; i < images1.length; i++) {
    //     imageObject[0].image_id = images1[i].name;
    //     imageObject[0].title = '套餐项目';
    //     imageObject[0].type = 1;
    //     createImages(imageObject);
    // }
    for (let i = 0; i < images2.length; i++) {
        imageObject[0].image_id = images2[i].name;
        imageObject[0].title = '套餐简介';
        imageObject[0].type = 2;
        createImages(imageObject);
    }
    for (let i = 0; i < images3.length; i++) {
        imageObject[0].image_id = images3[i].name;
        imageObject[0].title = '体检须知';
        imageObject[0].type = 3;
        createImages(imageObject);
    }
    const object2 = [{ "project_project": result_id, "staff_staff": null }]
    getStaff().then(async(res) => {
        res.list = res.list.map((o) => {
            return {
                id: o.id,
                name: o.name,
                store: o.store.name
            }
        })
        for (let i = 0; i < categoryArr.length; i++) {
            let findKey = res.list.find(item => `${item.store}:${item.name}` == categoryArr[i])
            object2[0].staff_staff = findKey.id
            createProductCategory(object2)
        }
    })

    return result;
}
export async function updateProduct(id, objects) {
    let addProject = objects.addProject;
    let category = objects.category;
    let categoryArr = category.split(",")
    console.log(category,'category')
    let images1 = objects.fileList1[0];
    let images2 = objects.fileList2;
    let images3 = objects.fileList3;
    delete objects.fileList2;
    delete objects.fileList3;
    delete objects.addProject;
    delete objects.category;
    delete objects.fileList1;
    delete objects.imageUrl;
    objects.notice_id = images1?.name??null;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($id: bigint!,$objects:project_set_input) {\r\n  update_project(_set: $objects , where: {id: {_eq: $id}}) {\r\n    affected_rows\r\n  }\r\n}",
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


    // let skus_arr = skus.split(",")
    // let price_arr = sku_prices.split(",")
    // getProductSkus(id).then((res) => {
    //     let ids = res.map((o) => {
    //         return o.id
    //     })
    //     const object = [{ "project_project": id, "sku_key": null, "sku_value": null, "price": null }]
    //         //删除原有数组
    //     deleteProductSkus(ids)
    //         //添加新数组
    //     for (let i = 0; i < skus_arr.length; i++) {
    //         object[0].sku_key = key
    //         object[0].sku_value = skus_arr[i]
    //         object[0].price = price_arr[i]
    //         createProductSkus(object)
    //     }
    // })

    // //详情图
    getImages(id).then(async(res) => {
        console.log(res,'resres1')
        let ids = res.map((o) => {
            return o.id
        })
            //删除原有数组
            await deleteImages(ids);
            //添加新数组
            const imageObject = [{ image_id: null, project_project: id,title:null,type:null }]
            
            for (let i = 0; i < images2.length; i++) {
                imageObject[0].image_id = images2[i].name;
                imageObject[0].title = '套餐简介';
                imageObject[0].type = 2;
                createImages(imageObject);
            }
            for (let i = 0; i < images3.length; i++) {
                imageObject[0].image_id = images3[i].name;
                imageObject[0].title = '体检须知';
                imageObject[0].type = 3;
                createImages(imageObject);
            }
    })

    //加项目
    getAddproject(id).then((res)=>{
        console.log(res,'resres2')
        let ids = res.map((o) => {
            return o.id
        });
        //deleteAddproject
        const deleteAddprojectIds = ids.filter((id) => !addProject.includes(id));
        deleteAddproject(deleteAddprojectIds);
        const createAddproject   = addProject.filter((id) => !ids.includes(id));
        const object = [{ "project_project": id, "add_project_add_project": null}]
    for (let i = 0; i < createAddproject.length; i++) {
        object[0].add_project_add_project = createAddproject[i]
        createProductSkus(object)
    }
    })


    return result;
}
export async function createProductCategory(objects) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
    var graphql = JSON.stringify({
        query: "mutation ($objects: [staff_project_insert_input!]!) {\n  insert_staff_project(objects: $objects) {\n    affected_rows\n  }\n}\n",
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
export async function createProductSkus(objects) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($objects: [project_add_project_insert_input!]!) {\n  insert_project_add_project(objects: $objects) {\n    affected_rows\n  }\n}\n",
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



export async function getProductSkus(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "query ($id:bigint){\r\n  sku_value(\r\n    limit: null\r\n    offset: null\r\n    where: {_and: [{project_project: {_eq: $id}}]}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n   id\r\n  }\r\n}",
        variables: { "id": id }
    })
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };

    const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions);
    const result = await response.json();

    return result.data.sku_value;
}

export async function getProductCategory(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "query ($id:bigint){\r\n  staff_project(\r\n    limit: null\r\n    offset: null\r\n    where: {_and: [{project_project: {_eq: $id}}]}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n   id\r\n  }\r\n}",
        variables: { "id": id }
    })
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };

    const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions);
    const result = await response.json();

    return result.data.staff_project;
}

export async function deleteProductSkus(ids) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
    var graphql = JSON.stringify({
        query: "mutation ($ids: [bigint!]) {\n  delete_sku_value(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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

export async function deleteProductCategory(ids) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
    var graphql = JSON.stringify({
        query: "mutation ($ids: [bigint!]) {\n  delete_staff_project(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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

export async function getImages(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "query ($id:bigint){\r\n  project_detail_images(\r\n    limit: null\r\n    offset: null\r\n    where: {_and: [{project_project: {_eq: $id}}]}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n   id\r\n  }\r\n}",
        variables: { "id": id }
    })
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };

    const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions);
    const result = await response.json();

    return result.data.project_detail_images;
}

export async function createImages(objects) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
    var graphql = JSON.stringify({
        query: "mutation ($objects: [project_detail_images_insert_input!]!) {\n  insert_project_detail_images(objects: $objects) {\n    affected_rows\n  }\n}\n",
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


export async function deleteImages(ids) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
    var graphql = JSON.stringify({
        query: "mutation ($ids: [bigint!]) {\n  delete_project_detail_images(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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

export async function getAddproject(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "  query ($id: bigint) {\r\n  project_add_project(order_by: [{id: desc_nulls_last}], where: {_and: [{ project_project: { _eq: $id }}]}) {\r\n    id\r\n     }\r\n}",
        variables: {  "id": id }
    })
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };

    const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
    const result = await response.json();
    result.list = result.data.project_add_project

    return result.list;
}

export async function deleteAddproject(ids) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
    var graphql = JSON.stringify({
        query: "mutation ($ids: [bigint!]) {\n  delete_project_add_project(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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



export async function createProductByExcel(objects) {
    console.log(objects,'objects');
    let addProject = objects[0].addProject;
    addProject = addProject.replace(/\s/g, "").replace(/，/g, ",").split(",");
    let store = objects[0].store;
    const storeName = store.replace(/\s/g, "").replace(/：/g, ":").split(":")[0];
    delete objects[0].store;
    delete objects[0].addProject;
    objects[0].sale_num = 0;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($objects: [project_insert_input!]!) {\n  insert_project(objects: $objects) {\r\n    affected_rows\r\n    returning{\r\n      id\r\n    }\n}\n}\n",
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
    console.log(result,'result')


      let result_id = result.data.insert_project.returning[0].id;
    const object = [{ "project_project": result_id, "add_project_add_project": null}]


    getAddprojectByStore(addProject,storeName).then((res)=>{
        res.forEach((item)=>{
            
            object[0].add_project_add_project = item.id;
            console.log(item,"additem",object)
            createProductSkus(object)
        })
    })
   
    
    const object2 = [{ "project_project": result_id, "staff_staff": null }]
    getStaff().then(async(res) => {
        res.list = res.list.map((o) => {
            return {
                id: o.id,
                name: o.name,
                store: o.store.name
            }
        })
        let findKey = res.list.find(item => `${item.store}:${item.name}` == store);
        object2[0].staff_staff = findKey.id
        createProductCategory(object2)
    })

    return result;
}

export async function getAddprojectByStore(title,store) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "query ($limit: Int, $offset: Int,$title: [String!],$store:String) {\r\n  add_project(limit: $limit, offset: $offset, where: {_and:[{title: {_in: $title}},{store: {name: {_eq: $store}}}]}) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    title\r\n    sub_title\r\n    price\r\n    category_add_project_categray\r\n    store_store\r\n    projects {\r\n      id\r\n    }\r\n    order_details {\r\n      id\r\n    }\r\n  }\r\n}",
        variables: {  "title": title,"store":store }
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

    return result.list;
}
