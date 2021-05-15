import { derived } from 'svelte/store'
import { login, refresh, session } from "@api/auth";
import {
    url,
    path,
    pattern,
    query,
    fragment,
    click,
    state,
    back,
    goto,
} from "svelte-pathfinder";
import { history } from "@routes";

const base = '/api/v1/db'

// const getsession = (data) => { return get(session)[data] }
// const sess = () => { return JSON.parse(sessionStorage.session) }
// session.subscribe(s => token = s.access_token)
// const options = {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: `Baerer ${getsession('access_token')}`
//     },
// }

async function myFetch(path, { ...options }, body = undefined) {
    function req() {
        return fetch(path, {
            ...options,
            headers: {
                Authorization: `Baerer ${JSON.parse(sessionStorage.session).access_token}`,
                "Content-Type": "application/json",
            },
            ...(body && { body: JSON.stringify(body) })
        });
    }
    try {
        let res = await req();
        if (res.status === 401) {
            const ref = await refresh();
            if (ref.status === 200) {
                res = await req();
            } else {
                return { status: 400 }
                goto(`/${get(history).lang}/auth`);
            }
        }
        return res.json();
    } catch (err) {
        console.log("err: ", err)
        return { status: 400 }
    }
}

export async function get(url) {
    const path = `${base}/${url}`;
    return myFetch(path, { method: "GET" })
}

export async function add(url, payload) {
    const path = `${base}/${url}`;
    await myFetch(path, { method: "POST" }, payload)
    return get(url.split("&id")[0])
}

export async function set(url, payload) {
    const path = `${base}/${url}`;
    await myFetch(path, { method: "PUT" }, payload)
    return get(url.split("&id")[0])
}

export async function patch(url, payload) {
    const path = `${base}/${url}`;
    return myFetch(path, { method: "PATCH" }, payload)
    options.method = "PATCH"
    options.body = JSON.stringify(payload)

    return fetch(path, options)
        .then((res) => res.json())
        .catch((err) => {
            console.error(err);
            get(type, query);
        });
}

export async function del(url) {
    const path = `${base}/${url}`;
    await myFetch(path, { method: "DELETE" })
    return get(url.split("&id")[0])
}
