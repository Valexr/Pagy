import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import { omatch, osome } from '$utils'

const
    adapter = new FileAsync(`data/pages.json`),
    lowdb = () => low(adapter)

// function db(req, res, next) {
//     console.log('db', req.params)
//     // adapter = new FileAsync(`data/pages-${req.params.locale}.json`)
//     adapter = new FileAsync(`data/pages.json`)
//     next()
// }

export default function (app) {
    // app.use(db)

    app.get('/:type', (req, res) => {
        if (Object.keys(req.query).length) {
            if (req.query.id) {
                lowdb().then(lowdb => {
                    const item = lowdb
                        .get(req.params.type)
                        .find({ id: +req.query.id })
                        .value()
                    res.json(item)
                })
            } else if (req.query.sq) {
                lowdb().then(lowdb => {
                    const items = lowdb
                        .get(req.params.type)
                        .filter(o => osome(o, req.query.sq))
                        .value()
                    res.json(items)
                    // o.sq.some(o => req.query.sq.includes(`${o}`))
                })
            } else {
                lowdb().then(lowdb => {
                    const items = lowdb
                        .get(req.params.type)
                        .filter(o => omatch(o, req.query))
                        .value()
                    res.json(items)
                })
            }
        } else {
            lowdb().then(lowdb => {
                const items = lowdb
                    .get(req.params.type)
                    .value()
                res.json(items)
            })
        }
    })

    app.post('/:type', (req, res, next) => {
        lowdb().then(lowdb => {
            lowdb
                .get(req.params.type)
                .push(req.body)
                .last()
                .assign({ id: Date.now(), create: Date.now(), update: Date.now(), locale: req.query.locale, menu: req.query.menu })
                .write()
                .then(item => res.json(item))
        })
    })

    app.put('/:type', (req, res, next) => {
        lowdb().then(lowdb => {
            lowdb
                .get(req.params.type)
                .find({ id: +req.query.id })
                .assign({ ...req.body, update: Date.now() })
                .write()
                .then(item => res.json(item))
        })
    })

    app.patch('/:type', (req, res, next) => {
        lowdb().then(lowdb => {
            lowdb
                .get(req.params.type)
                .each((o, i) => o[req.query.patch] = Object.values(o))
                .write()
                .then(items => res.json(items))
        })
    })

    app.delete('/:type', (req, res) => {
        if (req.query.prop) {
            lowdb().then(lowdb => {
                lowdb
                    .get(req.params.type)
                    .each(o => delete o[req.query.prop])
                    .write()
                    .then(item => res.json(item))
            })
        } else {
            lowdb().then(lowdb => {
                lowdb
                    .get(req.params.type)
                    .remove(o => omatch(o, req.query))
                    .write()
                    .then(item => res.json(item))
            })
        }
    })
}