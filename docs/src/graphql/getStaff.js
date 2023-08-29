export async function getStaff(limit, offset, name) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "query ($limit: Int, $offset: Int,$name:String) {\r\n  staff(\r\n    limit: $limit\r\n    offset: $offset\r\n    where: {_and: [\r\n   { name: { _ilike: $name } }\r\n ]}\r\n    order_by: [{idx: asc_nulls_last}]\r\n  ) {\r\n    id\r\n    created_at\r\n    updated_at\r\n    store_store\r\n  store{\r\n name\r\n }  \r\n    status\r\n    idx\r\n   invited_num\r\n    telephone\r\n    staff_type\r\n    introduce\r\n    good_at\r\n    projects {\r\n      id\r\n    }\r\n    projects {\r\n      staff_staff\r\n      project{\r\n        name\r\n      }\r\n    }\r\n    store {\r\n      id\r\n    }\r\n  }\r\n  staff_aggregate(where: {_and: []}) {\r\n    aggregate {\r\n      count\r\n    }\r\n  }\r\n}",
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

export async function deleteStaff(ids) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($ids: [bigint!]) {\n  delete_staff(where: {id: {_in: $ids}}) {\n    affected_rows\n  }\n}\n",
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


export async function createStaff(objects) {
    let projects = objects[0].projects

    delete objects[0].projects
    delete objects[0].imageUrl

    // console.log(objects,projects)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($objects: [staff_insert_input!]!) {\n  insert_staff(objects: $objects) {\r\n    affected_rows\r\n    returning{\r\n      id\r\n    }\n}\n}\n",
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
    let result_id = result.data.insert_staff.returning[0].id;
    let project_arr = projects.split(",")
    const object = [{ "staff_staff": result_id, "project_project": null }]
    const goodAt = [{ id: 1, name: '针灸' }, { id: 2, name: '艾灸' }, { id: 3, name: '推拿' }, { id: 4, name: '就诊' }]
    for (let i = 0; i < project_arr.length; i++) {
        let findKey = goodAt.find(item => item.name == project_arr[i])
        object[0].project_project = findKey.id
        createStaffProjects(object)
    }
    return result;
}

export async function createStaffProjects(objects) {

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

export async function updateStaff(id, body) {
    // console.log(body.projects)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "mutation ($store_store:bigint,$staff_type: String,$name: String,$introduce: String,$status: String,$good_at: String,$avatar_id: bigint,$id: bigint!,$idx: bigint) {\n  update_staff(_set: {name:$name,idx:$idx,staff_type:$staff_type,introduce:$introduce,good_at:$good_at,status:$status,avatar_id:$avatar_id,store_store:$store_store}, where: {id: {_eq: $id}}) {\n    affected_rows\n  }\n}\n",
        variables: { "id": id, "name": body.name, "staff_type": body.staff_type, "introduce": body.introduce, "good_at": body.good_at, "status": body.status, "avatar_id": body.avatar_id, "store_store": body.store_store, "idx": body.idx }
    })

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: graphql,
        redirect: 'follow'
    };
    const response = await fetch("https://zion-app.functorz.com/dKyywolVQK0/zero/2gXzl5O2L2X/api/graphql-v2", requestOptions)
    const result = await response.json();

    let project_arr = body.projects.split(",");
    getStaffsProjects(id).then((res) => {
        // console.log(res)
        let project_ids = res.map((o) => {
            return o.project_project;
        })
        let ids = res.map((o) => {
            return o.id
        })
        const object = [{ "staff_staff": id, "project_project": null }]
        const goodAt = [{ id: 1, name: '针灸' }, { id: 2, name: '艾灸' }, { id: 3, name: '推拿' }, { id: 4, name: '就诊' }]
        let project_ids_arr = []
        for (let i = 0; i < project_arr.length; i++) {
            let findKey = goodAt.find(item => item.name == project_arr[i]);
            // project_arr_obj.push(findKey);
            project_ids_arr.push(findKey.id);
            // console.log(i)
        }
        console.log(project_ids_arr.sort(), project_ids.sort())
        if (!isAllEqual(project_ids_arr.sort(), project_ids.sort())) {
            //删除原有数组
            for (let i = 0; i < ids.length; i++) {
                deleteStaffProject(ids)
            }
            //添加新数组
            for (let i = 0; i < project_arr.length; i++) {
                let findKey = goodAt.find(item => item.name == project_arr[i])
                    // project_arr_obj.push(findKey);
                object[0].project_project = findKey.id
                createStaffProjects(object)
                    // console.log(i)
            }
        }
    })


    return result;
}


export async function getStaffsProjects(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJoYXN1cmFfY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFkbWluIiwieC1oYXN1cmEtdXNlci1pZCI6IjEwMDk5OTk5OTk5OTk5OTkiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfSwiemVybyI6e30sInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJaRVJPX1VTRVJfSUQiOiIxMDA5OTk5OTk5OTk5OTk5IiwiZGVmYXVsdFJvbGUiOiJhZG1pbiJ9.bnDdAc_An5PYwQ2ExrSOnGHXyntmE7jYM7Er_wh4KA4");
    myHeaders.append("Content-Type", "application/json");

    var graphql = JSON.stringify({
        query: "query ($id:bigint){\r\n  staff_project(\r\n    limit: null\r\n    offset: null\r\n    where: {_and: [{staff_staff: {_eq: $id}}]}\r\n    order_by: [{id: desc_nulls_last}]\r\n  ) {\r\n   id\r\n  project_project}\r\n}",
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


export async function deleteStaffProject(ids) {
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

function isAllEqual(array1, array2) {
    if (array1.length != array2.length) {
        return false;
    } else {
        for (var i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false
            }
        }
    }
    return true;
}