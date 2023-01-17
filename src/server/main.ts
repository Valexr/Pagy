import path from "path";
import { derver } from 'derver';
import 'dotenv/config'
import { cookie, auth, token, db } from '$EP';
import middlewares from '$lib/middlewares';

const DEV = process.env.NODE_ENV === 'dev';

const app = derver({
    dir: path.join(__dirname, 'client'),
    host: '0.0.0.0',
    port: DEV ? 3131 : 1313,
    remote: DEV ? 'svelte_derver_starter' : '',
    // watch: DEV,
    spa: true,
    cache: DEV ? 0 : 3600,
    compress: !DEV,
});

app.sub('/api', (app) => {
    app.sub('/v1', (app) => {
        app.use(...middlewares);
        app.sub('/auth', auth);
        app.use(cookie);
        app.use(token);
        app.sub('/db', db);
    });
});
