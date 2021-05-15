import { login, refresh, session } from "@api/auth";

const base = '/api/v1/pages'
const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        ...session.authorizationHeader,
        // Authorization: session.store.refresh_token,
    },
}

export async function get(type, query = '') {
    const path = `${base}/${type}${query}`;
    return fetch(path).then((res) => res.json());
}

export async function add(type, payload, query = '') {
    const path = `${base}/${type}${query}`;
    options.method = "POST"
    options.body = JSON.stringify(payload)

    return fetch(path, options)
        .then((res) => get(type, query))
        .catch((err) => {
            console.log(err);
            get(type, query);
        });
}

export async function set(type, payload, query = '') {
    const path = `${base}/${type}${query}`;
    options.method = "PUT"
    options.body = JSON.stringify(payload)

    return fetch(path, options)
        .then((res) => get(type, query.split("&id")[0]))
        .catch((err) => {
            console.error(err);
            get(type, query.split("&id")[0]);
        });
}

export async function patch(type, payload, query = '') {
    const path = `${base}/${type}${query}`;
    options.method = "PATCH"
    options.body = JSON.stringify(payload)

    return fetch(path, options)
        .then((res) => res.json())
        .catch((err) => {
            console.error(err);
            get(type, query);
        });
}

export async function del(type, query = '') {
    const path = `${base}/${type}${query}`;
    options.method = "DELETE"

    return fetch(path, options)
        .then((res) => get(type, query.split("&id")[0]))
        .catch((err) => {
            console.error(err);
            get(type, query.split("&id")[0]);
        });
}
