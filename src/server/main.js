import server from '@server';
// const cors = require('cors');
const redis = require('./redis.js');
import { log, json, body } from './middlewares'

// @server is preconfigured instance of the Derver server
// https://github.com/alexxnb/derver

// Derver configuration parameters
const app = server({
    port: 1313,
    spa: true,
    host: '0.0.0.0',
    cache: 3600
});

// Add middlewares. See Derver readme for more info.

// app.use(cors);
// app.use(bodyParser.json());
app.use(body)
app.use(log)
app.use(json)
app.sub('/books', (app) => {
    app.get('/redis/', redis.getBooks);
    app.get('/redis/:id', redis.getBookById);
    app.post('/redis/', redis.postBook);
    app.put('/redis/:id', redis.updateBook);
    app.delete('/redis/:id', redis.deleteBook);
});

console.log('Start migrations');
redis.redisMigration();


app.use('/hello/:name', (req, resp, next) => {
    resp.send('Hello, ' + req.params.name);
})
