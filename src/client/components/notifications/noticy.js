import { readable, writable, derived, get } from "svelte/store"

function createNoticy() {
    const options = {
        message: 'noticy', type: "default", timeout: 0, title: '', close: true
    }

    function createTimer(duration) {
        return readable(duration, (set) => {
            const timer = setInterval(() => {
                duration > 0
                    ? set((duration = duration - 1))
                    : clearInterval(timer);
            }, 10);
        });
    }

    const noticys = writable([]);

    let currentId = 1;

    function send(message = 'noticy', type = "default", timeout = 0, title = '', close = true) {
        const id = currentId++;
        noticys.update(state => {
            state = state.filter(n => n.timeout > 0)
            return [...state, { id, type, message, timeout, title, close }];
        });
        if (timeout > 0) {
            setTimeout(() => {
                noticys.update(state => {
                    return [...state.filter(n => n.id !== id)];
                });
            }, timeout);
        }
    }
    function close(id) {
        noticys.update(state => {
            return [...state.filter(n => n.id !== id)]
        })
    }
    function clear() {
        noticys.set([])
    }


    // const _notifications = writable([])
    // function send(message = 'noticy', type = "default", timeout = 0, title = '', close = true) {
    //     _notifications.update(state => {
    //         return [...state, { id: id(), type, message, timeout, title, close }]
    //     })
    // }

    // const notifications = derived(_notifications, ($_notifications, set) => {
    //     set($_notifications)
    //     if ($_notifications.length > 0) {
    //         // console.log($_notifications[0].timeout)
    //         if ($_notifications[0].timeout === 0) {
    //             return () => _notifications.update(state => {
    //                 state.shift()
    //                 return state
    //             })
    //         } else {
    //             const timer = setTimeout(() => {
    //                 _notifications.update(state => {
    //                     state.shift()
    //                     return state
    //                 })
    //             }, $_notifications[0].timeout)
    //             return () => {
    //                 clearTimeout(timer)
    //             }
    //         }
    //     }
    // })
    // function id() {
    //     return '_' + Math.random().toString(36).substr(2, 9);
    // };

    return {
        subscribe: noticys.subscribe,
        send,
        close,
        clear,
        default: (msg, timeout, title, close) => send(msg, "default", timeout, title, close),
        error: (msg, timeout, title, close) => send(msg, "error", timeout, title, close),
        warning: (msg, timeout, title, close) => send(msg, "warning", timeout, title, close),
        primary: (msg, timeout, title, close) => send(msg, "primary", timeout, title, close),
        success: (msg, timeout, title, close) => send(msg, "success", timeout, title, close),
    }
}


export const noticy = createNoticy()