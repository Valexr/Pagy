import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import { omatch, osome } from '$utils'

let base, table, pattern = '/:base/:table'

async function connect(req, res, next) {
    base = await low(new FileAsync(`data/${req.params.base}.json`))
    table = base.get(req.params.table)
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
                    ? table.find({ id: +req.query.id }).value()
                    : req.query.sq
                        ? table.filter(o => osome(o, req.query.sq)).value()
                        : table.filter(o => omatch(o, req.query)).value()
            res.json(items)

        } else if (all) {
            const data = await base.read()
            const state = base.getState()
            // const rename = Object.entries(state).each(([k, v]) => k === 'items' ? k = 'users' : '')
            const items = data.get('items').value()
            // console.log('data', JSON.stringify(data), items, state)
            res.json(items)

        } else {
            const items = table.value()
            res.json(items)
        }
    })

    app.post(pattern, (req, res, next) => {
        const meta = { id: Date.now(), create: Date.now(), update: Date.now(), role: req.query.role }
        const item = table.push(req.body).last().assign(meta).write()
        res.json(item)
    })

    app.put(pattern, (req, res, next) => {
        const meta = { ...req.body, update: Date.now() }
        const item = table.find({ id: +req.query.id }).assign(meta).write()
        res.json(item)
    })

    app.patch(pattern, (req, res, next) => {
        fn = req.query.patch
        // console.log(fn)
        // lowdb
        //     .get(req.params.data)
        //     .each((o, i) => o[req.query.patch] = Object.values(o))
        //     .write()
        //     .then(items => res.json(items))
    })

    app.delete(pattern, (req, res) => {
        const item = req.query.prop
            ? table.each(o => delete o[req.query.prop]).write()
            : table.remove(o => omatch(o, req.query)).write()
        res.json(item)
    })

}