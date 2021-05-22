import { Low, JSONFile } from 'lowdb'
// import lodash from 'lodash'
import { omatch, osome } from '$lib/utils'

let base, table, pattern = '/:base/:table'

const dbs = {}
function db(file) {
    dbs[file] ||= new Low(new JSONFile(`data/${file}.json`))
    return dbs[file]
}
const lowdb = (file) => new Low(new JSONFile(`data/${file}.json`))

async function connect(req, res, next) {
    // base = lowdb(req.params.base)
    base = db(req.params.base)
    await base.read()
    table = req.params.table
    // const { items } = base.data
    // console.log(base.data)
    next()
}

export default function (app) {

    app.use(pattern, connect)

    app.get(pattern, async (req, res) => {
        const hasquery = Object.keys(req.query).length
        const all = req.params.table === 'all'

        if (hasquery) {
            const items =
                req.query.id
                    ? base.data[table].find(i => i.id === +req.query.id)
                    : req.query.q
                        ? base.data[table].filter(o => osome(o, req.query.q))
                        : base.data[table].filter(o => omatch(o, req.query))
            res.json(items)

        } else if (all) {
            // await base.read()
            res.json(base.data.filters.role)

        } else {
            // const items = table
            res.json(base.data[table])
        }
    })

    app.post(pattern, async (req, res, next) => {
        const meta = { id: Date.now(), create: Date.now(), update: Date.now(), role: req.query.role }
        base.data[table].push({ ...req.body, ...meta })
        await base.write()
        res.json(base.data[table])
    })

    app.put(pattern, async (req, res, next) => {
        const meta = { ...req.body, update: Date.now() }
        base.data[table].forEach(i => i.id === +req.query.id && Object.assign(i, meta))
        await base.write()
        res.json(base.data[table])
    })

    app.patch(pattern, async (req, res, next) => {
        fn = req.query.patch
    })

    app.delete(pattern, async (req, res) => {
        base.data[table] = req.query.prop
            ? base.data[table].forEach(o => delete o[req.query.prop])
            : base.data[table].filter(o => !omatch(o, req.query))
        await base.write()
        res.json(base.data[table])
    })

}