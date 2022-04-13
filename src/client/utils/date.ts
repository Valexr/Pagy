// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

import { readable, writable } from "svelte/store";

export function dateFormat(date, locale, options) {
    if (date) {
        let
            datetime = new Date(date.includes(' ') ? date : +date),
            locale = 'ru',
            options = {
                dateStyle: 'short',
                timeStyle: 'medium',
                // day: '2-digit',
                // month: '2-digit',
                // year: 'numeric',
                // hour12: false,
                // hour: '2-digit',
                // minute: '2-digit',
                // second: '2-digit'
            }
        return new Intl.DateTimeFormat(locale, options).format(datetime)
    } else { return 'undefined' }
}

export function date(utc, locale = "ru") {
    return new Date(utc).toLocaleString(locale);
}
export function time(utc, locale = "ru") {
    return new Date(utc).toLocaleTimeString(locale);
}

export function createTimer(timeout = 10000, duration = 1000) {
    return readable(timeout, (set) => {
        const timer = setInterval(() => {
            timeout > 0
                ? set((timeout = timeout - duration))
                : clearInterval(timer);
        }, duration);
    });
}

export const times = readable(null, set => {
    set(new Date());

    const interval = setInterval(() => {
        set(new Date());
    }, 1000);

    return () => clearInterval(interval);
});