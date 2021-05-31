import server from '@server';
import { cookie, auth, token, db } from '$EP'
import middlewares from '$lib/middlewares'

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
        app.use(cookie)
        app.use(token)
        app.sub('/db', db)
    })
});
