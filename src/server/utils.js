// export const slug = (...args: (string | number)[]): string => {
export function slugify(...args) {
    return args
        .join(" ")
        .normalize("NFD") // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-zа-я0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, "-"); // separator
};

export function objMatch(obj, query) {
    return Object.entries(obj).reduce((t, [k, v]) => {
        if (k in query) {
            t = query[k].toString().includes(v.toString())
        }
        return t === true || false
    })
    // return Object.entries(o).map(([k, v]) => {
    //     if (k in q) {
    //         return `${q[k]}`.includes(`${v}`)
    //     }
    // }).filter(i => typeof i === 'boolean').every(i => i === true)

    // for (const [k, v] of Object.entries(o)) {
    //     if (k in q && q[k].includes(v.toString()) === false) return false;
    // }
    // return true;
}

export function omatch(o, q) {
    const match = Object.entries(o).map(([k, v]) => {
        if (k in q) {
            // console.log(JSON.stringify(v))
            const
                qa = q[k].split(','),
                va = v.toString().split(','),
                m = adiff(qa, va)
            return m
        }
    }).filter(i => typeof i === 'boolean').every(i => i === true)
    return match
}

function adiff(a, b, same = true, bool = true) {
    if (a.length && b.length) {
        const d = b.map((i) => i);
        a = a.filter((i) => same ? d.includes(i) : !d.includes(i));
        return a.length ? bool ? true : a : false
    }
}