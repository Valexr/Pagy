// import Redis from 'ioredis'

// const
//     DEV = process.env.NODE_ENV === 'dev',
//     host = DEV ? 'localhost' : 'redis',
//     options = {
//         host: host,
//         port: 6379,
//         password: 'timestamp',
//         db: 0,
//         // socket: ""
//     }
// export const db = new Redis(options);
// db.connect(() => console.log('Connected to Redis server'));


// import { createClient } from 'redis';

// export const client = createClient(options)
// client.on('connect', () => {
//     console.log('Connected to Redis')
// })
// client.auth(options.password)



import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import FileAsync from 'lowdb/adapters/FileAsync'

const adapter = new FileAsync('../json/lowdb.json')
export const lowdb = () => low(adapter)






/// MODULES --------------------------------
// https://github.com/AkashBabu/redis-json
// https://github.com/stockholmux/node_redis-rejson
// https://github.com/danitseitlin/redis-modules-sdk
