import server from '@server';
import redis from './redis'
import { log, json, body } from './middlewares'

const DEV = process.env.NODE_ENV === 'dev';
const app = server({
    port: DEV ? 3131 : 1313,
    spa: true,
    host: '0.0.0.0',
    cache: 3600
});

app.sub('/api', (app) => {
    app.use(body)
    app.use(json)
    app.use(log)
    app.get('/:type', redis.get);
    app.get('/:type/:id', redis.get);
    app.post('/:type', redis.post);
    app.put('/:type/:id', redis.update);
    app.delete('/:type/:id', redis.del);
});

console.log('Start migrations');
redis.migration();
