import { cookie, token, login, logout, refresh } from '$EP';
import os from 'os';

// console.log('mac: ', os.networkInterfaces())

export default function (app) {
    app.get('/cookie', cookie);
    app.get('/token', token);
    app.post('/login', login);
    app.post('/logout', logout);
    app.get('/refresh', refresh);
}
