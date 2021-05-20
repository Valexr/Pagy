import server from '@server';
import auth from '$EP/auth'
// import pages from '$EP/pages'
// import users from '$EP/users'
// import locales from '$EP/locales'
import db from '$EP/db'
import token from './token'
import middlewares from './middlewares'

const DEV = process.env.NODE_ENV === 'dev';

const app = server({
    port: DEV ? 3131 : 1313,
    spa: true,
    host: '0.0.0.0',
    cache: DEV ? 0 : 3600
});

app.sub('/api', (app) => {
    app.sub('/v1', app => {
        app.use(...middlewares)
        app.sub('/auth', auth)
        app.use(token)
        app.sub('/db', db)
        // app.sub('/pages', pages)
        // app.sub('/users', users)
        // app.sub('/locales', locales)
    })
});
