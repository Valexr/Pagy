import fetch from '@api/fetch'


async function get(url) {
    return fetch(url, { method: "GET" })
}

async function add(url, payload) {
    await fetch(url, { method: "POST" }, payload)
    return get(url.split("&id")[0])
}

async function set(url, payload) {
    await fetch(url, { method: "PUT" }, payload)
    return get(url.split("&id")[0])
}

async function patch(url, payload) {
    return fetch(url, { method: "PATCH" }, payload)
}

async function del(url) {
    await fetch(url, { method: "DELETE" })
    return get(url.split("&id")[0])
}

export { get, add, set, patch, del }
