import { refresh } from "@api/auth";

const base = '/api/v1/db'

export default async function (url, { ...options }, body = undefined) {
    function req() {
        return fetch(base + url, {
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
                // goto(`/${get(history).lang}/auth`);
            }
        }
        return res.json();
    } catch (err) {
        console.log("err: ", err)
        return { status: 400 }
    }
}