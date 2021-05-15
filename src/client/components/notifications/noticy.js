import { writable, derived } from "svelte/store"

function createNotificationStore() {
    const _notifications = writable([])
    const options = {
        type: 'default',
        icon: '',
        title: '',
        message: '',
        timeout: '',
        close: true
    }

    function send(message = 'noticy', type = "default", timeout = 0, title = '', close = true) {
        _notifications.update(state => {
            return [...state, { id: id(), type, message, timeout, title, close }]
        })
    }
    function close(id) {
        _notifications.update(state => {
            return [...state.filter(n => n.id !== id)]
        })
    }

    const notifications = derived(_notifications, ($_notifications, set) => {
        set($_notifications)
        if ($_notifications.length > 0) {
            // console.log($_notifications[0].timeout)
            if ($_notifications[0].timeout === 0) {
                return () => _notifications.update(state => {
                    state.shift()
                    return state
                })
            } else {
                const timer = setTimeout(() => {
                    _notifications.update(state => {
                        state.shift()
                        return state
                    })
                }, $_notifications[0].timeout)
                return () => {
                    clearTimeout(timer)
                }
            }
        }
    })

    return {
        subscribe: notifications.subscribe,
        send,
        close,
        default: (msg, timeout, title, close) => send(msg, "default", timeout, title, close),
        error: (msg, timeout, title, close) => send(msg, "error", timeout, title, close),
        warning: (msg, timeout, title, close) => send(msg, "warning", timeout, title, close),
        primary: (msg, timeout, title, close) => send(msg, "primary", timeout, title, close),
        success: (msg, timeout, title, close) => send(msg, "success", timeout, title, close),
    }
}

function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const noticy = createNotificationStore()