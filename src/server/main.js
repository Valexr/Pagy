import server from '@server';
import lowdb from './lowdb'
import pages from '$EP/pages'
import users from '$EP/users'
import locales from '$EP/locales'
import { log, json, body } from './middlewares'

const DEV = process.env.NODE_ENV === 'dev';
const app = server({
    port: DEV ? 3131 : 1313,
    spa: true,
    host: '0.0.0.0',
    cache: DEV ? 0 : 3600
});

app.sub('/api', (app) => {
    app.use(body)
    app.use(json)
    app.use(log)
    app.sub('/v1', app => {
        app.sub('/pages', pages)
        app.sub('/users', users)
        app.sub('/locales', locales)
    })

    app.sub('/base', (app) => {
        app.get('/:datatype/:type/:locale', lowdb.db);
        app.get('/:datatype/:type', lowdb.db);
        // app.get('/:datatype/:type', lowdb.get);
    })
    app.sub('/auth', (app) => {
        console.log(app)
    })
    app.sub('/users', (app) => {
        app.get('/:datatype/:type', lowdb.db)
        console.log(app)
    })
    app.sub('/data', (app) => {
        // app.use('/:type', lowdb.load)
        app.get('/:datatype/:type/:locale', lowdb.db);
        app.get('/:type', lowdb.get);
        app.get('/:type/:id', lowdb.get);
        app.post('/:type', lowdb.post);
        app.put('/:type/:id', lowdb.put);
        app.delete('/:type/:id', lowdb.del);
    })
});
// app.use(json)
// app.sub('/api/v1/pages', pages)

// lowdb.load()
