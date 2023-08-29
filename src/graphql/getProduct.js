import { getCategory } from '~/graphql/getCategory'

export async function getProduct(limit, offset, name) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: " query getProduct($limit: Int, $offset: Int,$name:String) {\r\n  product(\r\n    limit: $limit\r\n    offset: $offset\r\n    where: {_and: [{ name: { _ilike: $name }}]}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    name\r\n    price\r\n    sub_title\r\n  idx\r\n    description\r\n  sale_count\r\n  erp_item_id\r\n  original_price\r\n  is_show\r\n    reserve\r\n    category{\r\n      category{\r\n        title\r\n      }\r\n    }\r\n    image {\r\n      url\r\n      id\r\n    }\r\n    description_image{\r\n      id\r\n      url\r\n    }\r\n    images(limit: $limit, offset: $offset) {\r\n      id\r\n      created_at\r\n      updated_at\r\n      image_id\r\n      image {\r\n        url\r\n        id\r\n      }\r\n      }\r\n    skus {\r\n      id\r\n      sku_key\r\n      sku_value\r\n  price\r\n   }\r\n    category{\r\n      category{\r\n        title\r\n      }\r\n    }\r\n  }\r\n  product_aggregate(where: {_and: []}) {\r\n    aggregate {\r\n      count\r\n    }\r\n  }\r\n}",
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
    result.list = result.data.product

    return result;
}

export async function deleteProduct(ids) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($ids: [bigint!]) {\n  delete_product(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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
        query: "mutation ($is_show: Boolean, $id: bigint!) {\n  update_product(\n    _set: {is_show: $is_show}\n    where: {id: {_eq: $id}}\n  ) {\n    affected_rows\n  }\n}\n",
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
    let key = objects[0].key
    let skus = objects[0].skus
    let sku_prices = objects[0].sku_prices
    let category = objects[0].category
    let images = objects[0].fileList
    console.log("images", images)
    delete objects[0].key
    delete objects[0].skus
    delete objects[0].imageUrl
    delete objects[0].sku_prices
    delete objects[0].category
    delete objects[0].fileList

    // console.log(objects,projects)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($objects: [product_insert_input!]!) {\n  insert_product(objects: $objects) {\r\n    affected_rows\r\n    returning{\r\n      id\r\n    }\n}\n}\n",
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
    let result_id = result.data.insert_product.returning[0].id;
    let skus_arr = skus.split(",")
    let price_arr = sku_prices.split(",")
    let category_arr = category.split(",")
    const object = [{ "product_product": result_id, "sku_key": null, "sku_value": null, "price": null }]
    for (let i = 0; i < skus_arr.length; i++) {
        object[0].sku_key = key
        object[0].sku_value = skus_arr[i]
        object[0].price = price_arr[i]
        createProductSkus(object)
    }
    const imageObject = [{ image_id: null, product_id_product: result_id }]
    for (let i = 0; i < images.length; i++) {
        imageObject[0].image_id = images[i].name;
        createImages(imageObject);
    }
    const object2 = [{ "product_product": result_id, "category_category": null }]
    getCategory().then((res) => {
        res.list = res.list.map((o) => {
            return {
                id: o.id,
                name: o.title
            }
        })
        for (let i = 0; i < category_arr.length; i++) {
            let findKey = res.list.find(item => item.name == category_arr[i])
            object2[0].category_category = findKey.id
            createProductCategory(object2)
        }
    })

    return result;
}

export async function createProductCategory(objects) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
    var graphql = JSON.stringify({
        query: "mutation ($objects: [category_product_insert_input!]!) {\n  insert_category_product(objects: $objects) {\n    affected_rows\n  }\n}\n",
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
        query: "mutation ($objects: [sku_value_insert_input!]!) {\n  insert_sku_value(objects: $objects) {\n    affected_rows\n  }\n}\n",
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

export async function updateProduct(id, objects) {
    let key = objects.key
    let skus = objects.skus
    let sku_prices = objects.sku_prices
    let category = objects.category
    let images = objects.fileList
    delete objects.key
    delete objects.skus
    delete objects.imageUrl
    delete objects.descriptionImageUrl
    delete objects.sku_prices
    delete objects.category
    delete objects.fileList
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($id: bigint!,$objects:product_set_input) {\r\n  update_product(_set: $objects , where: {id: {_eq: $id}}) {\r\n    affected_rows\r\n  }\r\n}",
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


    let skus_arr = skus.split(",")
    let price_arr = sku_prices.split(",")
    getProductSkus(id).then((res) => {
        let ids = res.map((o) => {
            return o.id
        })
        const object = [{ "product_product": id, "sku_key": null, "sku_value": null, "price": null }]
            //删除原有数组
        deleteProductSkus(ids)
            //添加新数组
        for (let i = 0; i < skus_arr.length; i++) {
            object[0].sku_key = key
            object[0].sku_value = skus_arr[i]
            object[0].price = price_arr[i]
            createProductSkus(object)
        }
    })

    //详情图
    getImages(id).then((res) => {
        let ids = res.map((o) => {
            return o.id
        })
        const imageObject = [{ image_id: null, product_id_product: id }]
            //删除原有数组
        deleteImages(ids)
            //添加新数组
        for (let i = 0; i < images.length; i++) {
            imageObject[0].image_id = images[i].name
            createImages(imageObject)
        }
    })

    //分类
    let category_arr = category.split(',')
    const object2 = [{ "product_product": id, "category_category": null }]
    getProductCategory(id).then((res) => {
        let ids2 = res.map((o) => {
                return o.id
            })
            //删除原有数组
        deleteProductCategory(ids2)
            //添加新数组
        getCategory().then((res) => {
            res.list = res.list.map((o) => {
                return {
                    id: o.id,
                    name: o.title
                }
            })
            for (let i = 0; i < category_arr.length; i++) {
                let findKey = res.list.find(item => item.name == category_arr[i])
                object2[0].category_category = findKey.id
                createProductCategory(object2)
            }
        })
    })


    return result;
}

export async function getProductSkus(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "query ($id:bigint){\r\n  sku_value(\r\n    limit: null\r\n    offset: null\r\n    where: {_and: [{product_product: {_eq: $id}}]}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n   id\r\n  }\r\n}",
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
        query: "query ($id:bigint){\r\n  category_product(\r\n    limit: null\r\n    offset: null\r\n    where: {_and: [{product_product: {_eq: $id}}]}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n   id\r\n  }\r\n}",
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

    return result.data.category_product;
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
        query: "mutation ($ids: [bigint!]) {\n  delete_category_product(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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
        query: "query ($id:bigint){\r\n  product_images(\r\n    limit: null\r\n    offset: null\r\n    where: {_and: [{product_id_product: {_eq: $id}}]}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n   id\r\n  }\r\n}",
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

    return result.data.product_images;
}

export async function createImages(objects) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");
    var graphql = JSON.stringify({
        query: "mutation ($objects: [product_images_insert_input!]!) {\n  insert_product_images(objects: $objects) {\n    affected_rows\n  }\n}\n",
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
        query: "mutation ($ids: [bigint!]) {\n  delete_product_images(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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