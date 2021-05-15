import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { omatch, osome } from '$utils'
// require('dotenv').config({ path: './.env', debug: true })

const JWT_SECRET = process.env.JWT_SECRET
console.log('jwt', JWT_SECRET)

const
    adapter = new FileAsync(`data/users.json`),
    lowdb = () => low(adapter)

export default function (app) {

    app.get('/cookie', async (req, res, next) => {
        console.log(req.headers.cookie)
        if (req.headers.cookie) {
            try {
                const cookies = cookie.parse(req.headers.cookie)
                const verified = jwt.verify(cookies.sid, JWT_SECRET);
                if (verified) {
                    const user = await lowdb().then(lowdb => {
                        return lowdb
                            .get('items')
                            .find({ id: verified.id })
                            .value()
                    })
                    const pass = await bcrypt.compare(user.password, verified.pass)
                    if (!pass) { return res.error(401, "Bad password"); }
                    console.log(cookies, verified, user)
                    res.json(user)
                }

            } catch (err) {
                res.error(400, err, {
                    'Set-Cookie': cookie.serialize('sid', 'null', { maxAge: 0, path: '/', httpOnly: true })
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
                access_token: jwt.sign({ id: user.id, pass: bcrypt.hashSync(user.password, 9) }, JWT_SECRET, {
                    expiresIn: "5s"
                }),
                refresh_token: jwt.sign({ id: user.id, pass: bcrypt.hashSync(user.password, 9) }, JWT_SECRET, {
                    expiresIn: "1m"
                })
            }
            if (!tokens.access_token.length || !tokens.refresh_token.length) { return res.error(401, "Bad tokens"); }

            const verified = jwt.verify(tokens.refresh_token, JWT_SECRET);
            const session = { ...tokens, id: user.id, username: user.username, exp: verified.exp }
            if (session) {
                if (remember) {
                    const cookie_token = jwt.sign({ id: user.id, pass: bcrypt.hashSync(user.password, 9) }, JWT_SECRET, {
                        expiresIn: "1h"
                    })
                    res.writeHead(200, {
                        'Set-Cookie': cookie.serialize('sid', cookie_token, {
                            maxAge: 31536000,
                            path: '/',
                            httpOnly: true,
                            // secure
                        })
                    });
                } else {
                    res.writeHead(200, {
                        'Set-Cookie': cookie.serialize('sid', 'null', { maxAge: 0, path: '/', httpOnly: true })
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
            const verified = jwt.verify(token, JWT_SECRET);

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

                const access_token = jwt.sign({ id: user.id, pass: bcrypt.hashSync(user.password, 9) }, JWT_SECRET, {
                    expiresIn: "5s"
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

    app.put('/:type', (req, res, next) => {
        lowdb().then(lowdb => {
            lowdb
                .get(req.params.type)
                .find({ id: +req.query.id })
                .assign({ ...req.body, update: Date.now() })
                .write()
                .then(item => res.json(item))
        })
    })

    app.patch('/:type', (req, res, next) => {
        lowdb().then(lowdb => {
            lowdb
                .get(req.params.type)
                .each(o => o.password = bcrypt.hashSync(o.username, 9))
                .write()
                .then(items => res.json(items))
        })
    })

    app.delete('/:type', (req, res) => {
        if (req.query.prop) {
            lowdb().then(lowdb => {
                lowdb
                    .get(req.params.type)
                    .each(o => delete o[req.query.prop])
                    .write()
                    .then(item => res.json(item))
            })
        } else {
            lowdb().then(lowdb => {
                lowdb
                    .get(req.params.type)
                    .remove(o => omatch(o, req.query))
                    .write()
                    .then(item => res.json(item))
            })
        }
    })
}