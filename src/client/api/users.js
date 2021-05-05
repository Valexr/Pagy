const base = '/api/v1/users'

export async function get(type, url = '') {
    const path = `${base}/${type}${url}`;
    return fetch(path).then((res) => res.json());
}

export async function add(type, payload) {
    const path = `${base}/${type}`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };
    return fetch(path, options)
        .then((res) => get(type))
        .catch((err) => {
            console.log(err);
            get(type);
        });
}

export async function set(type, id, payload) {
    const path = `${base}/${type}/${id}`;
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };
    return fetch(path, options)
        .then((res) => get(type))
        .catch((err) => {
            console.error(err);
            get(type);
        });
}

export async function del(type, id) {
    const path = `${base}/${type}/${id}`;
    const options = { method: "DELETE" }
    return fetch(path, options)
        .then((res) => get(type))
        .catch((err) => {
            console.error(err);
            get(type);
        });
}
