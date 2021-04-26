const base = '/api/users'

export async function db(datatype, type) {
    const path = `${base}/${datatype}/${type}`;
    return await fetch(path).then((res) => res.json());
}

export async function get(type, id) {
    const path = `${base + type}/${id ? id : ''}`;
    return await fetch(path).then((res) => res.json());
}

export async function add(type, payload) {
    const path = `${base + type}`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };
    return await fetch(path, options)
        // const item = await res.json();
        // items = [...items, item];
        .then((res) => get(type))
        .catch((err) => {
            console.log(err);
            get(type);
        });
}

export async function set(type, payload, id) {
    const path = `${base + type}/${id}`;
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };
    return fetch(path, options)
        // const item = await res.json();
        // const index = pages.findIndex((el) => el.id === item.id);
        // pages[index] = item;
        .then((res) => get(type))
        .catch((err) => {
            console.error(err);
            get(type);
        });
}

export async function del(type, id) {
    const path = `${base + type}/${id}`;
    const options = { method: "DELETE" }
    return fetch(path, options)
        // const diff = await res.json();
        // const ids = diff.map((i) => i.id);
        // pages = pages.filter((el) => !ids.includes(el.id));
        // console.log("delete: ", diff, ids, pages);
        .then((res) => get(type))
        .catch((err) => {
            console.error(err);
            get(type);
        });
}
