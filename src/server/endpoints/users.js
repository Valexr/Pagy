import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import { omatch } from '$utils'

let adapter
const lowdb = () => low(adapter)

function db(req, res, next) {
    console.log('db', req.params)
    adapter = new FileAsync(`data/users.json`)
    next()
}

export default function (app) {
    app.use(db)

    app.get('/:type', (req, res) => {
        console.log(req.query)
        if (Object.keys(req.query).length) {
            lowdb().then(lowdb => {
                const items = lowdb
                    .get(req.params.type)
                    .filter(o => omatch(o, req.query))
                    .value()
                res.json(items)
            })
        } else {
            lowdb().then(lowdb => {
                const items = lowdb
                    .get(req.params.type)
                    .value()
                console.log(items)
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