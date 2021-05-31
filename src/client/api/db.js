import fetch from '@api/fetch'

async function get(url) {
    return fetch(url, { method: "GET" })
}

async function add(url, payload) {
    return fetch(url, { method: "POST" }, payload)
}

async function set(url, payload) {
    return fetch(url, { method: "PUT" }, payload)
}

async function patch(url, payload) {
    return fetch(url, { method: "PATCH" }, payload)
}

async function del(url) {
    return fetch(url, { method: "DELETE" })
}

export { get, add, set, patch, del }
