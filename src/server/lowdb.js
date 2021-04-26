import { lowdb, createdb } from './db'
import { nanoid } from 'nanoid'

export default { db, get, post, put, del }

async function db(req, res, next) {
    if (req.params.locale) createdb(req.params.datatype, req.params.locale)
    else createdb(req.params.datatype)
    lowdb().then(lowdb => {
        lowdb.defaults({ [req.params.type]: [] }).write()
        const items = lowdb
            .get(req.params.type)
            .value()
        res.json(items)
        // next()
    })
    // lowdb._.mixin({
    //     add: function (a, v) {
    //         let has = false
    //         a.some(i => {
    //             if (lowdb._.isEqual(i, v)) has = true
    //         })
    //         !has && a.push(v)
    //     }
    // })
    // lowdb
    //     .defaults(books)
    //     .get('books')
    //     .add({
    //         id: '76lSx6Wy',
    //         title: 'The LowDb Book',
    //         author: 'Karl Seguin',
    //         description: 'The LowDb Book is a free book introducing LowDb.',
    //         create: 1618776910917,
    //         update: 1618776910917
    //     })
    //     .write()


    // const postId = lowdb
    //     .get('posts')
    //     .push({ id: nanoid(idlength), title: 'low!' })
    //     .write()
    //     .id

    // const post = lowdb
    //     .get('posts')
    //     .find({ id: postId })
    //     .value()

    // lowdb._.mixin(lodashId)
    // const collection = lowdb
    //     .defaults({ posts: [] })
    //     .get('posts')

    // // Insert a new post...
    // const newPost = collection
    //     .insert({ title: 'low!' })
    //     .write()

    // // ...and retrieve it using its id
    // const post = collection
    //     .getById(newPost.id)
    //     .value()

    // console.log('post: ', post)
}

function get(req, res) {
    console.log(req.params)
    if (req.params.id) {
        // lowdb._.mixin(lodashId)
        lowdb().then(lowdb => {
            const item = lowdb
                .get(req.params.type)
                .find({ id: +req.params.id })
                // .getById(req.params.id)
                .value()
            res.json(item)
        })
    } else {
        lowdb().then(lowdb => {
            const type = lowdb.has(req.params.type).value()
            console.log(type)
            if (type) {
                const items = lowdb
                    .get(req.params.type)
                    .value()
                res.json(items)
            } else {
                lowdb
                    .set(req.params.type, [])
                    .write()
                res.json([])
            }
        })
    }
}

function post(req, res, next) {
    // lowdb._.mixin(lodashId)
    lowdb().then(lowdb => {
        lowdb
            .get(req.params.type)
            .push(req.body)
            .last()
            .assign({ id: Date.now(), create: Date.now() }, req.body)
            .write()
            .then(item => res.json(item))
    })
}

function put(req, res, next) {
    // lowdb._.mixin(lodashId)
    lowdb().then(lowdb => {
        lowdb
            .get(req.params.type)
            .find({ id: +req.params.id })
            .assign({ ...req.body, update: Date.now() })
            .write()
            .then(item => res.json(item))
    })
}

function del(req, res) {
    // lowdb._.mixin(lodashId)
    lowdb().then(lowdb => {
        lowdb
            .get(req.params.type)
            .remove({ id: +req.params.id })
            .write()
            .then(item => res.json(item))
    })
}
