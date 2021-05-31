import { writable, readable, derived, get } from "svelte/store";

const base = '/api/v1/auth'

export const session = writable(JSON.parse(sessionStorage.getItem('session')) || {});
session.subscribe(val => sessionStorage.session = JSON.stringify(val));

// export const authed = derived(
//     [session],
//     ([$session], set) => {
//         if ($session.access) {
//             const refreshable = $session.refresh && $session.refresh !== "undefined"
//             if (refreshable) {
//                 set(true)
//             }
//             else {
//                 set(false)
//             }
//         } else set(false)
//     }, false);

// export const session = writable({})

// const getsession = (data) => { return get(session)[data] }

// export const back = writable(JSON.parse(localStorage.getItem('back')) || {});
// back.subscribe(val => localStorage.back = JSON.stringify(val));


// function createSession(store) {

//     const session = writable(JSON.parse(sessionStorage.getItem('session')) || {});
//     const back = writable(JSON.parse(sessionStorage.getItem('back')) || {})

//     function create(store, data) {
//         back.set(store)
//         back.subscribe(back => store.back = JSON.stringify(back));
//         session.set(data)
//         session.subscribe(session => store.session = JSON.stringify(session));
//     }

//     function update(data) {
//         session.update(val => { return { ...val, access_token: data } })
//         session.subscribe(val => back.session = JSON.stringify(val));
//     }

//     function invalidate(prop) {
//         session.update(val => { return { [prop]: val[prop] } })
//         session.subscribe(val => back.session = JSON.stringify(val));
//     }

//     function clear() {
//         session.set({})
//         session.subscribe(val => back.session = JSON.stringify(val));
//     }

//     function get(prop) {
//         console.log(prop)
//         session.subscribe(val => console.log(back.session))
//         // return JSON.parse(back.session)[prop]
//     }

//     function send(message, type = "default", timeout) {
//         console.log('notify')
//         const id = currentId++;
//         notifications.update(state => {
//             return [...state, { id, type, message, timeout }];
//         });
//         setTimeout(() => {
//             notifications.update(state => {
//                 return state.filter((notification) => notification.id !== id);
//             });
//         }, timeout);
//     }

//     function close(id) {
//         notifications.update(state => {
//             return [...state.filter(n => n.id !== id)]
//         })
//     }
//     const unsubscribe = session.subscribe(value => {
//         console.log(value);
//     });
//     unsubscribe()

//     const { subscribe } = session
//     return {
//         subscribe,
//         unsubscribe,
//         send,
//         get,
//         create,
//         update,
//         clear,
//         invalidate,
//         close: (id) => close(id),
//         default: (msg, timeout) => send(msg, "default", timeout),
//         danger: (msg, timeout) => send(msg, "danger", timeout),
//         warning: (msg, timeout) => send(msg, "warning", timeout),
//         info: (msg, type, timeout) => send(msg, "info", timeout),
//         success: (msg, timeout) => send(msg, "success", timeout)
//     }
// }
// export const session = createSession()


// let remember = false
// export const values = derived(
//     session,
//     ($session, set) => {
//         if (!session.isValid) {
//             set([]); // session has expired no more data
//         } else {
//             fetch("/api/v1/auth/verify", {
//                 headers: {
//                     ...session.authorizationHeader,
//                 },
//             }).then(async (data) => set(await data.json()));
//         }
//         return () => { };
//     },
//     []
// );
// $values contains fetch result as long as session has not expired


export async function cookie() {
    const path = `${base}/cookie`;
    const options = {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get(session).refresh}`,
        }
    }

    try {
        return await fetch(path, options)
    } catch (err) {
        console.log("err: ", err)
        // res.error(400, err);
    }
}

export async function login(form) {
    const path = `${base}/login`;
    const options = {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    }

    try {
        const res = await fetch(path, options)
        const user = await res.json()
        const status = res.status
        res.ok && session.set(user)
        return { status, user }
    } catch (err) {
        console.log("err: ", err)
        // res.error(401, err);
    }
}

export async function refresh(token) {
    const path = `${base}/refresh`;
    const options = {
        method: "GET",
        // credentials: 'include',
        headers: {
            Authorization: `Bearer ${get(session).refresh}`,
        },
    }
    try {
        const res = await fetch(path, options)
        const user = await res.json()
        const status = res.status
        if (res.status === 200) {
            session.update(session => session = {
                userid: user.userid,
                username: user.username,
                access: user.access,
                refresh: session.refresh,
            });
            // session.update(user.access_token);
        } else {
            session.update(session => session = {
                username: session.username,
            });
            // session.invalidate('username');
        }
        return { status, user }
    } catch (err) {
        console.log("err: ", err)
        // res.error(401, err);
    }
}

export async function logout() {
    const path = `${base}/logout`;
    const options = {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify(form),
    }

    try {
        const res = await fetch(path, options)
        // const user = await res.json()
        // const status = res.status
        session.set({})
        // return res
        console.log(res)
    } catch (err) {
        console.log("err: ", err)
        // res.error(401, err);
    }
}