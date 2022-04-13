import { get } from 'svelte/store';
import { session } from '@api/auth';

const base = '/api/v1/db';
// const access = get(session).access

export default async function (url, { ...options }, body = undefined) {
    function req() {
        return fetch(base + url, {
            ...options,
            // credentials: 'include',
            headers: {
                // ...(access && { Authorization: `Baerer ${access}` }),
                'Content-Type': 'application/json',
            },
            ...(body && { body: JSON.stringify(body) }),
        });
    }
    try {
        let res = await req();
        // if (res.status === 401) {
        //     const ref = await refresh();
        //     if (ref.status === 200) {
        //         res = await req();
        //     } else {
        //         return { status: 400 }
        //         // goto(`/${get(history).lang}/auth`);
        //     }
        // } else
        if (res.status !== 200) return { status: res.status };
        return res.json();
    } catch (err) {
        console.log('err: ', err);
        return { status: 400 };
    }
}
