
import { client } from './db'
import { promisify } from 'util';
import { zoo } from './zoo'
import { card } from './card'
// import { lowDb } from './lowdb'

const
    multi = client.multi(),
    hgetall = promisify(client.hgetall).bind(client),
    keys = promisify(client.keys).bind(client),
    type = promisify(client.type).bind(client),
    id = new Date().getTime(),
    uts = ~~(Date.now() / 1000) // Math.floor(Date.now() / 1000) || ~~(+new Date / 1000) / ~~(new Date().getTime() / 1000)

export default { migration, get, post, update, del, posts };

async function migration() {
    // let data = lowDb()

    // console.log(data)
    // console.log(data)
    // client.keys('book*', (e, keys) => {
    //     keys.forEach((k, i) => {
    //         // client.del(k)
    //         client.hset('book:' + i, [
    //             'title', 'The Little Redis Book',
    //             'author', 'Karl Seguin',
    //             'description', 'The Little Redis Book is a free book introducing Redis.',
    //             'create', new Date,
    //             'update', new Date,
    //         ])
    //     })
    // })

    // multi.exec((e, r) => console.log(r))
    // client.hset('book:1', [
    //     'title', 'The Little Redis Book',
    //     'author', 'Karl Seguin',
    //     'description', 'The Little Redis Book is a free book introducing Redis.',
    //     'create', new Date
    // ], (e, r) => e ? console.log(e) : console.log(r));
    // client.hset('user:1', [
    //     'role', 'admin',
    //     'email', 'The Little Redis Book',
    //     'password', 'Karl Seguin',
    //     'description', 'The Little Redis Book is a free book introducing Redis.',
    //     'create', new Date
    // ])
    // client.hset('user:2', [
    //     'role', 'publisher',
    //     'email', 'The Little Redis Book',
    //     'password', 'Karl Seguin',
    //     'description', 'The Little Redis Book is a free book introducing Redis.',
    //     'create', new Date
    // ])
    // client.hset('role:admin:1', [
    //     'role', 'admin',
    //     'email', 'The Little Redis Book',
    //     'password', 'Karl Seguin',
    //     'description', 'The Little Redis Book is a free book introducing Redis.',
    //     'create', new Date
    // ])
    // client.hset('role:admin:2', [
    //     'role', 'admin',
    //     'email', 'The Little Redis Book',
    //     'password', 'Karl Seguin',
    //     'description', 'The Little Redis Book is a free book introducing Redis.',
    //     'create', new Date
    // ])
    // client.hset('role:1', [
    //     'role', 'admin',
    //     'email', 'The Little Redis Book',
    //     'password', 'Karl Seguin',
    //     'description', 'The Little Redis Book is a free book introducing Redis.',
    //     'create', new Date
    // ])
    // client.select(1, (err, res) => {
    //     // you'll want to check that the select was successful here
    //     // if(err) return err;

    //     client.flushdb(function (err, succeeded) {
    //         console.log(succeeded); // will be true if successfull
    //     });
    //     // db.set('key', 'string'); // this will be posted to database 1 rather than db 0
    // });
}

function posts(req, res) {
    res.json(lowDb())
}
async function get(req, res) {
    // console.log(req.params)
    if (req.params.id) {
        // await hgetall(req.params.id).then(obj => res.json({ id: req.params.id, ...obj }));
        client.hgetall(req.params.id, (e, o) => {
            res.json({ id: req.params.id, ...o })
        })
    } else {
        // client.keys(req.params.type, (e, keys) => {
        //     const ps = keys.map(async (k) => {
        //         if (await type(k) === 'hash') {
        //             return hgetall(k).then((obj) => { return { id: k, ...obj }; })
        //         } else null
        //     })
        //     Promise.all(ps).then((data) => (console.log(data), res.json(data.filter(Boolean))));
        // })
        // let hashes = await keys(req.params.type)
        // let promises = hashes.map(async (key, i) => {
        //     let t = await type(key)
        //         if (t === 'hash')
        //             return hgetall(key).then((obj) => { return { id: key, ...obj }; })
        // });
        // Promise.all(promises).then((data) => res.json(data));
        mhgetall(req.params.type, 'hash', (e, r) => {
            // console.log('data:', r);
            res.json(r)
        });
    }
    zoo()
    // card()
};

async function keystype(k, t) {
    const
        ks = await keys(k),
        kp = await ks.map(async (k) => {
            if (await type(k) === t) return k
        }),
        km = await Promise.all(kp);
    return km.filter(Boolean);
}

async function mhgetall(k, t, cb) {
    const keys = await keystype(k, t)
    keys.forEach((key) => {
        multi.hgetall(key, (e, o) => o.id = key);
    });
    multi.exec((e, r) => {
        cb(e, r);
    });
}

async function post(req, res, next) {
    const {
        title,
        author,
        description
    } = req.body
    client.hmset(req.params.type + id, {
        title: title,
        author: author,
        description: description,
        create: new Date,
        update: new Date
    }, (e, r) => {
        res.send('Add succesfully');
    });
}

async function update(req, res, next) {
    const {
        title,
        author,
        description
    } = req.body
    client.hmset(req.params.id, [
        'title', title,
        'author', author,
        'description', description,
        'update', new Date
    ], (e, r) => {
        res.send('Updated succesfully');
    });
}

async function del(req, res) {
    client.del(req.params.id, (e, r) => {
        console.log(r);
        res.send('User deleted successfully');
    })
}
