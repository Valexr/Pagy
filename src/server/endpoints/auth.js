import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
// import { JWT_SECRET } from '.env'
import os from 'os'

// console.log('mac: ', os.networkInterfaces())
// process.env.JWT_SECRET = 'secret'
const lowdb = (file = 'users') => low(new FileAsync(`data/${file}.json`))

console.log('jwt', process.env.JWT_SECRET)
// let lowdb
// const params = '/:base/:data'

// async function database(req, res, next) {
//     lowdb = await low(new FileAsync(`data/${req.params.base}.json`))
//     next()
// }

export default function (app) {

    app.get('/cookie', async (req, res, next) => {
        console.log(req.headers.cookie)
        if (req.headers.cookie) {
            try {
                const cookies = cookie.parse(req.headers.cookie)
                const verified = jwt.verify(cookies.sid, process.env.JWT_SECRET);
                if (verified) {
                    const user = await lowdb().then(lowdb => {
                        return lowdb
                            .get('items')
                            .find({ id: verified.id })
                            .value()
                    })
                    const pass = await bcrypt.compare(user.password, verified.pass)
                    if (!pass) { return res.error(401, "Bad password"); }
                    console.log('cookies: ', cookies, verified, user)
                    res.json(user)
                }

            } catch (err) {
                res.error(400, err, {
                    'Set-Cookie': cookie.serialize('sid', '', {
                        maxAge: 0, path: '/api/v1/auth', httpOnly: true, sameSite: 'lax' // secures
                    })
                });
                console.log("err: ", err)
            }
        } else next()
    })

    // const secure = baseurl && baseurl.startsWith('https:');
    app.post('/login', async (req, res, next) => {
        try {
            const { username, password, remember } = req.body;
            const user = await lowdb().then(lowdb => {
                return lowdb
                    .get('items')
                    .find({ username })
                    .value()
            })
            if (!user) { return res.error(400, "User not found"); }

            const pass = await bcrypt.compare(password, user.password);
            if (!pass) { return res.error(401, "Bad password"); }

            const tokens = {
                access_token: jwt.sign({ id: user.id, pass: bcrypt.hashSync(user.password, 9) }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_ACCESS_EXP
                }),
                refresh_token: jwt.sign({ id: user.id, pass: bcrypt.hashSync(user.password, 9) }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_REFRESH_EXP
                })
            }
            if (!tokens.access_token.length || !tokens.refresh_token.length) { return res.error(401, "Bad tokens"); }

            const refresh = jwt.verify(tokens.refresh_token, process.env.JWT_SECRET);
            const ip = req.connection.remoteAddress
            const ua = req.headers['user-agent']
            const { id } = user
            const { exp } = refresh
            const session = { id, username, remember, ...tokens, exp, ip, ua }

            if (session) {
                await lowdb('sessions').then(lowdb => {
                    lowdb.defaults({ items: [] }).write()
                    lowdb.get('items').remove(o => o.username === session.username).write()
                    lowdb.get('items').push(session).write()
                })
                if (remember) {
                    console.log(process.env.JWT_COOKIE_EXP)
                    const cookie_token = jwt.sign({ id: user.id, pass: bcrypt.hashSync(user.password, 9) }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_COOKIE_EXP
                    })
                    res.writeHead(200, {
                        'Set-Cookie': cookie.serialize('sid', cookie_token, {
                            maxAge: 600, path: '/api/v1/auth', httpOnly: true, sameSite: 'lax' // secure
                        })
                    });
                } else {
                    res.writeHead(200, {
                        'Set-Cookie': cookie.serialize('sid', '', {
                            maxAge: 0, path: '/api/v1/auth', httpOnly: true, sameSite: 'lax' // secures
                        })
                    });
                }
                res.end(JSON.stringify(session))
            }
            // const session = await lowdb
            //     .get('items')
            //     .find({ id: user.id })
            //     .assign({ refresh_token: refresh_token })
            //     .write()
            //     .then(item => res.json({ access_token, refresh_token, id: user.id, username: user.username, exp: verified.exp }))

        } catch (err) {
            console.log("err: ", err)
            res.error(401, err);
        }
    })

    app.get('/refresh', async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const verified = jwt.verify(token, process.env.JWT_SECRET);

            if (verified) {
                const user = await lowdb().then(lowdb => {
                    return lowdb
                        .get('items')
                        .find({ id: verified.id })
                        .value()
                })
                // req.cookies = cookie.parse(req.headers.cookie || '');
                // const access = req.cookies.sid
                // const acc = jwt.verify(access, 'secret');

                const access_token = jwt.sign({ id: user.id, pass: bcrypt.hashSync(user.password, 9) }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_ACCESS_EXP
                });
                res.json({ access_token, id: user.id, username: user.username, refreshexp: verified.exp })
                // console.log(user, verified)
            } else {
                console.log("Token filed")
                res.error(401, "Token filed");
            }
        } catch (err) {
            console.log("err: ", err)
            res.error(401, err);
        }
    })

}