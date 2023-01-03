import { writable } from 'svelte/store';
import { redirect } from 'svelte-pathfinder';
import type { Session } from '@/types/client';

const base = '/api/v1/auth';

export const session = writable<Partial<Session>>({});

export async function cookie() {
    const path = `${base}/cookie`;
    const options = {
        method: 'GET',
        // credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await fetch(path, options);
        if (res.ok) return res.json();
        else console.log(res);
    } catch (err) {
        console.log('err: ', err);
    }
}

export async function login(form) {
    const path = `${base}/login`;
    const options = {
        method: 'POST',
        // credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    };

    try {
        const res = await fetch(path, options);
        const user = await res.json();
        const status = res.status;
        res.ok && session.set(user);
        return { status, user };
    } catch (err) {
        console.log('err: ', err);
    }
}

export async function refresh(token) {
    const path = `${base}/refresh`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await fetch(path, options);
        const user = await res.json();
        const status = res.status;
        if (res.status === 200) {
            session.update(
                (session) =>
                (session = {
                    userid: user.userid,
                    username: user.username,
                    access: user.access,
                    refresh: session.refresh,
                })
            );
        } else {
            session.update(
                (session) =>
                (session = {
                    username: session.username,
                })
            );
        }
        return { status, user };
    } catch (err) {
        console.log('err: ', err);
    }
}

export async function logout() {
    const path = `${base}/logout`;
    const options: RequestInit = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await fetch(path, options);
        const user = await res.json();
        res.ok ? session.set(user) : session.set({});
        redirect(`/auth`);
        return res;
    } catch (err) {
        console.log('err: ', err);
    }
}
