// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

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
