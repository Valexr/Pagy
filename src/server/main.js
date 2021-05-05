import server from '@server';
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
    app.sub('/v1', app => {
        app.use(body)
        app.use(json)
        app.use(log)
        app.sub('/pages', pages)
        app.sub('/users', users)
        app.sub('/locales', locales)
    })
});
