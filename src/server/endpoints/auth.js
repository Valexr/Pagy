import cookie from "$lib/cookie";
import login from "$EP/login";
import refresh from "$EP/refresh";
import os from 'os'

// console.log('mac: ', os.networkInterfaces())

export default function (app) {

    app.get('/cookie', cookie)

    app.post('/login', login)

    app.get('/refresh', refresh)

}