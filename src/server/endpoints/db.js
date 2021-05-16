import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import { omatch, osome } from '$utils'

// const db = async (adapter) => await low(new FileAsync(`data/${adapter}.json`))

let lowdb
const params = '/:base/:data'

async function database(req, res, next) {
    lowdb = await low(new FileAsync(`data/${req.params.base}.json`))
    next()
}
export default function (app) {
    app.use(params, database)

    app.get(params, async (req, res) => {
        if (Object.keys(req.query).length) {
            if (req.query.id) {
                const item = lowdb
                    .get(req.params.data)
                    .find({ id: +req.query.id })
                    .value()
                res.json(item)
            } else if (req.query.sq) {
                const items = lowdb
                    .get(req.params.data)
                    .filter(o => osome(o, req.query.sq))
                    .value()
                res.json(items)
            } else {
                const items = lowdb
                    .get(req.params.data)
                    .filter(o => omatch(o, req.query))
                    .value()
                res.json(items)
            }
        } else if (req.params.data === 'all') {
            const base = await lowdb.read()
            const users = lowdb.get('items').value()
            // lowdb.getState()
            console.log('base', JSON.stringify(base))
            res.json(base)
        } else {
            const items = lowdb
                .get(req.params.data)
                .value()
            res.json(items)
        }
    })

    app.post(params, (req, res, next) => {
        const item = lowdb
            .get(req.params.data)
            .push(req.body)
            .last()
            .assign({ id: Date.now(), create: Date.now(), update: Date.now(), role: req.query.role })
            .write()
        res.json(item)
    })

    app.put(params, (req, res, next) => {
        const item = lowdb
            .get(req.params.data)
            .find({ id: +req.query.id })
            .assign({ ...req.body, update: Date.now() })
            .write()
        res.json(item)
    })

    app.patch(params, (req, res, next) => {
        fn = req.query.patch
        // console.log(fn)
        // lowdb
        //     .get(req.params.data)
        //     .each((o, i) => o[req.query.patch] = Object.values(o))
        //     .write()
        //     .then(items => res.json(items))
    })

    app.delete(params, (req, res) => {
        if (req.query.prop) {
            const item = lowdb
                .get(req.params.data)
                .each(o => delete o[req.query.prop])
                .write()
            res.json(item)
        } else {
            const item = lowdb
                .get(req.params.data)
                .remove(o => omatch(o, req.query))
                .write()
            res.json(item)
        }
    })

}