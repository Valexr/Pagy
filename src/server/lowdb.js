import { lowdb } from './db'
import { nanoid } from 'nanoid'

export default { load, get, post, update, del }

export function lowDb() {
    // Set some defaults (required if your JSON file is empty)
    lowdb.defaults({ posts: [], user: {}, count: 0 })
        .write()

    lowdb._.mixin({
        add: function (a, v) {
            let has = false
            a.some(i => {
                if (lowdb._.isEqual(i, v)) has = true
            })
            !has && a.push(v)
        }
    })
    // Add a post
    lowdb.get('posts')
        // .includes({ id: 1, title: 'title3' })
        // .push({ id: 1, title: 'title2' })
        .add({ id: 5, title: 'title5' })
        .write()

    // Set a user using Lodash shorthand syntax
    lowdb.set('user.name', 'typicode')
        .write()

    // Increment count
    lowdb.update('count', n => n + 1)
        .write()

    const postsId1 = lowdb.get('posts')
        .filter({ id: 1, title: 'title' })
        .value()
    // console.log(postsId1)
    return lowdb.get('posts').value()
}

const idlength = 8
let utc = Date.now() // Math.floor(Date.now() / 1000) || ~~(+new Date / 1000) / ~~(new Date().getTime() / 1000) 
const books = { books: [] }
const pages = { pages: [] }
import lodashId from 'lodash-id'

function load() {
    lowdb().then(lowdb => {
        lowdb.defaults(books).write()
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
            const items = lowdb
                .get(req.params.type)
                .value()
            res.json(items)
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

function update(req, res, next) {
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
