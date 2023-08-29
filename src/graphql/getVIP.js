

export async function getAddproject(limit, offset, name) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "query ($limit: Int, $offset: Int,$name:String) {\r\n  ud_vip_2d0510(\r\n    limit: $limit\r\n    offset: $offset\r\n    order_by: [{id: desc_nulls_last}]\r\n    where: {\r\n  _and: [\r\n    {title: {_like: $name}}\r\n  ]\r\n}\r\n  ) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    title\r\n    sub_title\r\n    price\r\n    description\r\n    detail_img {\r\n      url(option: {resize: {width: 500, height: 500}})\r\n      id\r\n    }\r\n    records {\r\n      id\r\n    }\r\n    orders {\r\n      id\r\n    }\r\n  }\r\n}",
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
    result.list = result.data.ud_vip_2d0510

    return result;
}


export async function deleteProduct(ids) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($ids: [bigint!]) {\n  delete_ud_vip_2d0510(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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
        query: "mutation ($is_show: Boolean, $id: bigint!) {\n  update_ud_vip_2d0510(\n    _set: {is_show: $is_show}\n    where: {id: {_eq: $id}}\n  ) {\n    affected_rows\n  }\n}\n",
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
    delete objects[0].detail_img_url;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($objects: [ud_vip_2d0510_insert_input!]!) {\n  insert_ud_vip_2d0510(objects: $objects) {\r\n    affected_rows\r\n    returning{\r\n      id\r\n    }\n}\n}\n",
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
    delete objects.detail_img_url;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($id: bigint!,$objects:ud_vip_2d0510_set_input) {\r\n  update_ud_vip_2d0510(_set: $objects , where: {id: {_eq: $id}}) {\r\n    affected_rows\r\n  }\r\n}",
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



