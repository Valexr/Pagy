import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import { omatch, osome } from '$utils'

const lowdb = async (adapter) => await low(new FileAsync(`data/${adapter}.json`))
// const db = await lowdb(adapter)
const file = file => { return new FileAsync(`data/${file}.json`) }

// function db(req, res, next) {
//     adapter = new FileAsync(`data/users.json`)
//     next()
// }

export default function (app) {
    // app.use(db)

    app.get('/:type', async (req, res) => {
        if (Object.keys(req.query).length) {
            if (req.query.id) {
                lowdb('users').then(lowdb => {
                    const item = lowdb
                        .get(req.params.type)
                        .find({ id: +req.query.id })
                        .value()
                    res.json(item)
                })
            } else if (req.query.sq) {
                lowdb('users').then(lowdb => {
                    const items = lowdb
                        .get(req.params.type)
                        .filter(o => osome(o, req.query.sq))
                        .value()
                    res.json(items)
                    // o.sq.some(o => req.query.sq.includes(`${o}`))
                })
            } else {
                const itm = await low(file('users'))
                // .get(req.params.type)
                // .filter(o => omatch(o, req.query))
                // .value()
                console.log(itm)
                lowdb('users').then(lowdb => {
                    const items = lowdb
                        .get(req.params.type)
                        .filter(o => omatch(o, req.query))
                        .value()
                    res.json(items)
                })
            }
        } else {
            lowdb('users').then(lowdb => {
                const items = lowdb
                    .get(req.params.type)
                    .value()
                res.json(items)
            })
        }
    })

    app.get('/:type/:filter', (req, res) => {
        lowdb().then(lowdb => {
            const items = lowdb
                .get(req.params.type)
                .filter(o => o.role === req.params.filter)
                .value()
            res.json(items)
        })
    })

    app.get('/:type/:id', (req, res) => {
        lowdb().then(lowdb => {
            const item = lowdb
                .get(req.params.type)
                .find({ id: +req.params.id })
                // .getById(req.params.id)
                .value()
            res.json(item)
        })
    })

    app.post('/:type', (req, res, next) => {
        lowdb().then(lowdb => {
            lowdb
                .get(req.params.type)
                .push(req.body)
                .last()
                .assign({ id: Date.now(), create: Date.now() }, req.body)
                .write()
                .then(item => res.json(item))
        })
    })

    app.put('/:type/:id', (req, res, next) => {
        lowdb().then(lowdb => {
            lowdb
                .get(req.params.type)
                .find({ id: +req.params.id })
                .assign({ ...req.body, update: Date.now() })
                .write()
                .then(item => res.json(item))
        })
    })

    app.delete('/:type/:id', (req, res) => {
        lowdb().then(lowdb => {
            lowdb
                .get(req.params.type)
                .remove({ id: +req.params.id })
                .write()
                .then(item => res.json(item))
        })
    })
}