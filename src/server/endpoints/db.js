import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import { omatch, osome } from '$utils'

const db = async (adapter) => await low(new FileAsync(`data/${adapter}.json`))

export default function (app) {

    app.get('/:base/:data', async (req, res) => {
        console.log(req.params)
        if (Object.keys(req.query).length) {
            if (req.query.id) {
                db(req.params.base).then(lowdb => {
                    const item = lowdb
                        .get(req.params.data)
                        .find({ id: +req.query.id })
                        .value()
                    res.json(item)
                })
            } else if (req.query.sq) {
                db(req.params.base).then(lowdb => {
                    const items = lowdb
                        .get(req.params.data)
                        .filter(o => osome(o, req.query.sq))
                        .value()
                    res.json(items)
                })
            } else {
                db(req.params.base).then(lowdb => {
                    const items = lowdb
                        .get(req.params.data)
                        .filter(o => omatch(o, req.query))
                        .value()
                    res.json(items)
                })
            }
        } else if (req.params.data === 'all') {
            db(req.params.base).then(async lowdb => {
                const base = await lowdb.read()
                // lowdb.getState()
                // console.log(JSON.stringify(base))
                res.json(base)
            })
        } else {
            db(req.params.base).then(lowdb => {
                const items = lowdb
                    .get(req.params.data)
                    .value()
                res.json(items)
            })
        }
    })

    app.post('/:base/:data', (req, res, next) => {
        db(req.params.base).then(lowdb => {
            const item = lowdb
                .get(req.params.data)
                .push(req.body)
                .last()
                .assign({ id: Date.now(), create: Date.now(), update: Date.now(), role: req.query.role })
                .write()
            res.json(item)
        })
    })

    app.put('/:base/:data', (req, res, next) => {
        db(req.params.base).then(lowdb => {
            const item = lowdb
                .get(req.params.data)
                .find({ id: +req.query.id })
                .assign({ ...req.body, update: Date.now() })
                .write()
            res.json(item)
        })
    })

    app.patch('/:base/:data', (req, res, next) => {
        fn = req.query.patch
        console.log(fn)
        // lowdb(req.params.base).then(lowdb => {
        //     lowdb
        //         .get(req.params.data)
        //         .each((o, i) => o[req.query.patch] = Object.values(o))
        //         .write()
        //         .then(items => res.json(items))
        // })
    })

    app.delete('/:base/:data', (req, res) => {
        if (req.query.prop) {
            db(req.params.base).then(async lowdb => {
                const item = await lowdb
                    .get(req.params.data)
                    .each(o => delete o[req.query.prop])
                    .write()
                res.json(item)
            })
        } else {
            db(req.params.base).then(lowdb => {
                const item = lowdb
                    .get(req.params.data)
                    .remove(o => omatch(o, req.query))
                    .write()
                res.json(item)
            })
        }
    })

}