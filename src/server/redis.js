import { print, createClient } from 'redis';
import { promisify } from 'util';

const DEV = process.env.NODE_ENV === 'dev',
    host = DEV ? 'localhost' : 'redis',
    options = {
        host: host,
        port: 6379,
        password: 'timestamp',
        db: 0,
        socket: ""
    }, client = createClient(options)

const hgetall = promisify(client.hgetall).bind(client),
    keys = promisify(client.keys).bind(client)

const id = new Date().getTime(),
    timestamp = new Date;

export default { migration, get, post, update, del };

async function migration() {
    client.on('connect', () => {
        console.log('Connected to Redis')
    })
    client.auth(options.password, print)
    client.hset('book:1', [
        'title', 'The Little Redis Book',
        'author', 'Karl Seguin',
        'description', 'The Little Redis Book is a free book introducing Redis.',
        'create', timestamp
    ], (err, reply) => {
        if (err) {
            console.log(err);
        }
        console.log(reply);
    });
    client.hset('user:1', [
        'role', 'admin',
        'email', 'The Little Redis Book',
        'password', 'Karl Seguin',
        'description', 'The Little Redis Book is a free book introducing Redis.',
        'create', timestamp
    ], (err, reply) => { if (err) { console.log(err) } else { console.log(reply); } })
    client.hset('user:2', [
        'role', 'publisher',
        'email', 'The Little Redis Book',
        'password', 'Karl Seguin',
        'description', 'The Little Redis Book is a free book introducing Redis.',
        'create', timestamp
    ])
    client.hset('role:admin:1', [
        'role', 'admin',
        'email', 'The Little Redis Book',
        'password', 'Karl Seguin',
        'description', 'The Little Redis Book is a free book introducing Redis.',
        'create', timestamp
    ])
    client.hset('role:admin:2', [
        'role', 'admin',
        'email', 'The Little Redis Book',
        'password', 'Karl Seguin',
        'description', 'The Little Redis Book is a free book introducing Redis.',
        'create', timestamp
    ])
    client.hset('role:1', [
        'role', 'admin',
        'email', 'The Little Redis Book',
        'password', 'Karl Seguin',
        'description', 'The Little Redis Book is a free book introducing Redis.',
        'create', timestamp
    ])
    // client.select(1, (err, res) => {
    //     // you'll want to check that the select was successful here
    //     // if(err) return err;

    //     client.flushdb(function (err, succeeded) {
    //         console.log(succeeded); // will be true if successfull
    //     });
    //     // db.set('key', 'string'); // this will be posted to database 1 rather than db 0
    // });
}

async function get(req, res) {
    if (req.params.id) {
        await hgetall(req.params.id).then(obj => res.json({ _id: req.params.id, ...obj }));
    } else {
        let hashes = await keys(req.params.type);
        // console.log(hashes)
        let promises = hashes.map((key) => {
            return hgetall(key).then((obj) => { return { _id: key, ...obj }; });
        });
        Promise.all(promises).then((data) => res.json(data));
        MHGETALL(hashes, (err, arr) => {
            console.log('Received output from Redis Multi/Exec:');
            console.dir(arr);
        });
    }
};

function MHGETALL(keys, cb) {
    const multi = client.multi();
    keys.map((key) => {
        return multi.hgetall(key, (err, obj) => { obj = { _id: key, ...obj }; return obj });
    });
    multi.exec((err, result) => {
        cb(err, result);
    });
}

async function post(req, res, next) {
    const {
        title,
        author,
        description
    } = req.body
    client.hset(req.params.type + id, [
        'title', title,
        'author', author,
        'description', description,
        'create', timestamp,
        'update', timestamp
    ], (err, reply) => {
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
        'update', timestamp
    ], (err, reply) => {
        res.send('Updated succesfully');
    });
}

async function del(req, res) {
    client.del(req.params.id, (err, reply) => {
        console.log(reply);
        res.send('User deleted successfully');
    })
}
