import assert from 'assert';
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

// export function objMatch(obj, query) {
//     return Object.entries(obj).reduce((t, [k, v]) => {
//         if (k in query) {
//             t = query[k].toString().includes(v.toString())
//         }
//         return t === true || false
//     })
//     return Object.entries(o).map(([k, v]) => {
//         if (k in q) {
//             return `${q[k]}`.includes(`${v}`)
//         }
//     }).filter(i => typeof i === 'boolean').every(i => i === true)

//     for (const [k, v] of Object.entries(o)) {
//         if (k in q && q[k].includes(v.toString()) === false) return false;
//     }
//     return true;
// }

export function okey(o, k) {

}

function oparse(v) {
    return JSON.stringify(v).replace(/"|{|}|\[|]/g, "").split(',').map((b) => b.split(':')[1])
}
function sparse(v) { return v.toString().split(',') }

export function omatch(o, q) {
    const match = Object.entries(o).map(([k, v]) => {
        if (k in q) {
            // console.log(q[k] + ': ', typeof v)
            const
                qa = q[k].split(','),
                va = typeof v === 'string' || 'number' || v.length ? sparse(v) : oparse(v),
                m = adiff(qa, va)
            return m
        }
    }).filter(i => typeof i === 'boolean').every(i => i === true)
    return match
}

function adiff(a, b, same = true, bool = true) {
    if (a.length && b.length) {
        const d = b.map((b) => b);
        a = a.filter((a) => same ? d.includes(a) : !d.includes(a));
        return a.length ? bool ? true : a : false
    }
}

export function osome(o, q) {
    if (o && q) {
        const oa = Object.values(o)
        const qa = q.includes(',') ? q.split(',') : q.split(' ')
        const compare = (o, q) => JSON.stringify(o).toLowerCase().includes(q.toLowerCase())
        return q.includes(',') ? qa.some(q => compare(oa, q.trim())) : qa.every(q => compare(o, q))
    }
}

export function group(arr, keys) {
    return arr.reduce((storage, item) => {
        const objKey = keys.map((key) => `${item[key]}`).join(":");
        if (storage[objKey]) {
            storage[objKey].push(item);
        } else {
            storage[objKey] = [item];
        }
        return storage;
    }, {});
}

export async function filters(q) {
    const itms = await db.get(`/locales/items`);
    const fltrs = await db.get(`/locales/filters`);
    const diff = () => {
        return q.includes("&q") ? "&q" : "&id";
    };
    const query = q.split(diff())[0];
    console.log(query);
    function getQuery(i) {
        return query.split("&").slice(0, [i]).join("&");
    }
    const filters = await Object.keys(q.params)
        .filter((q) => q !== "q" && q !== "id")
        .reduce(async (acc, k, i) => {
            const items = await db.get(`/locales/items${getQuery(i)}`);
            console.log(
                k,
                fltrs,
                itms,
                Object.entries(fltrs)
                    .map(([key, val]) => {
                        if (
                            key === k
                            // && itms.some((it) => it[key].includes(val))
                        )
                            return val;
                    })
                    .filter(Boolean)
                    .flat(),
                items
            );
            const vals = Object.keys(group(items, [k])).filter(Boolean);
            const a = await acc;
            const val = [...new Set(`${vals}`.split(",").sort())];
            return { ...a, [k]: val };
        }, Promise.resolve({}));

    console.log("filters:", filters, "query: ", getQuery(3));
    return filters;
}