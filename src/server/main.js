import server from '@server';
// import redis from './redis';
import lowdb from './lowdb'
import { log, json, body } from './middlewares'

const DEV = process.env.NODE_ENV === 'dev';
const app = server({
    port: DEV ? 3131 : 1313,
    spa: true,
    host: DEV ? 'localhost' : '0.0.0.0',
    cache: DEV ? 0 : 3600
});

app.sub('/api', (app) => {
    app.use(body)
    app.use(json)
    app.use(log)
    app.get('/:type', lowdb.get);
    app.get('/:type/:id', lowdb.get);
    app.post('/:type', lowdb.post);
    app.put('/:type/:id', lowdb.update);
    app.delete('/:type/:id', lowdb.del);
});

lowdb.load()

// import low from 'lowdb'
// import FileSync from 'lowdb/adapters/FileSync'
// import FileAsync from 'lowdb/adapters/FileAsync'
// // Create database instance and start server
// const adapter = new FileAsync('db.json')

// low(adapter)
//     .then(db => {
//         app.sub('/api', (app) => {
//             app.use(body)
//             app.use(json)
//             app.use(log)

//             app.get('/:type', (req, res) => {
//                 const books = db.get(req.params.type)
//                     .value()
//                 res.json(books)
//             })

//             app.get('/:type/:id', (req, res) => {
//                 console.log(req.params)
//                 const book = db.get(req.params.type)
//                     .find({ id: +req.params.id })
//                     .value()
//                 res.json(book)
//             })

//             app.post('/:type', (req, res) => {
//                 db.get(req.params.type)
//                     .push(req.body)
//                     .last()
//                     .assign({ id: Date.now(), create: Date.now() })
//                     .write()
//                     .then(book => res.json(book))
//             })

//             app.put('/:type/:id', (req, res) => {
//                 db.get(req.params.type)
//                     .find({ id: +req.params.id })
//                     .assign({ ...req.body, update: Date.now() })
//                     .write()
//                     .then(book => res.json(book))
//             })

//             app.delete('/:type/:id', (req, res) => {
//                 const book = db.get(req.params.type)
//                     .remove({ id: +req.params.id })
//                     .write()
//                 res.json(book)
//             })
//         })

//         // Set db default values
//         return db.defaults({ books: [] }).write()
//     })
//   .then(() => {
//     app.listen(3000, () => console.log('listening on port 3000'))
//   })
