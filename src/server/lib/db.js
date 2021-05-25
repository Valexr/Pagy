import { Low, JSONFile } from 'lowdb'
import { omatch, osome, group } from '$lib/utils'
// import lodash from 'lodash'

export default { connect }

const dbs = {}
export function db(file) {
    dbs[file] ||= new Low(new JSONFile(`data/${file}.json`))
    return dbs[file]
}

async function connect(file, table = 'items') {
    const base = db(file)
    await base.read()

    return {
        base,
        write: async () => await base.write(),
        data: base.data,
        table: base.data[table],
        id: (id) => base.data[table].find(i => i.id === +id),
        one: (prop) => base.data[table].find(i => Object.entries(prop).every(([k, v]) => i[k] === v)),
        search: (query) => base.data[table].filter(o => osome(o, query)),
        match: (query) => base.data[table].filter(o => omatch(o, query)),
        insert: async (obj, meta) => {
            base.data[table].push({ ...obj, ...meta })
            await base.write()
            return base.data[table]
        },
        update: async (id, meta) => {
            base.data[table].forEach(i => i.id === +id && Object.assign(i, meta))
            await base.write()
            return base.data[table]
        },
        patch: async (query, meta) => {
            base.data[table].forEach(i => Object.assign(i, { [query]: i.languages.map(l => l.name) }))
            await base.write()
        },
        delete: async (query) => {
            base.data[table] = base.data[table].filter(o => !omatch(o, query))
            await base.write()
            return base.data[table]
        },
        deleteprop: async (query) => {
            base.data[table] = base.data[table].forEach(o => delete o[query])
            await base.write()
            return base.data[table]
        },
        replace: async (query, obj) => {
            base.data[table] = base.data[table].filter(o => !omatch(o, query));
            base.data[table].push(obj);
            await base.write()
            return base.data[table]
        },
        filters: (query) => {
            const qa = Object.entries(query).map(([k, v]) => { return { [k]: v } })
            const filters = Object.keys(query)
                .filter((q) => q !== "q" && q !== "id")
                .reduce((a, k, i) => {
                    const items = i === 0 ? base.data[table] : base.data[table].filter(o => omatch(o, qa[i - 1]))
                    const vals = Object.keys(group(items, [k])).filter(Boolean);
                    const val = [...new Set(`${vals}`.split(",").sort())];
                    return { ...a, [k]: val };
                }, {});

            return filters;
        }
    }
}

// async function filters(q) {
//     const itms = await db.get(`/locales/items`);
//     const diff = () => {
//         return q.includes("&q") ? "&q" : "&id";
//     };
//     const query = q.split(diff())[0];
//     function getQuery(i) {
//         return query.split("&").slice(0, [i]).join("&");
//     }
//     const filters = await Object.keys(q.params)
//         .filter((q) => q !== "q" && q !== "id")
//         .reduce(async (acc, k, i) => {
//             const items = await db.get(`/locales/items${getQuery(i)}`);
//             const vals = Object.keys(group(items, [k])).filter(Boolean);
//             const a = await acc;
//             const val = [...new Set(`${vals}`.split(",").sort())];
//             return { ...a, [k]: val };
//         }, Promise.resolve({}));

//     console.log("filters:", filters, "query: ", getQuery(3));
//     return filters;
// }