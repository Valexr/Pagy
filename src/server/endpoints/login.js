import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { db } from "$lib/db"

const users = db('users')
const sessions = db('sessions')


export default async function (req, res, next) {
    try {
        const { username, password, remember } = req.body;

        await users.read()
        const user = users.data.items.find(i => i.username === username)
        if (!user) { return res.error(400, "User not found") }

        const pass = await bcrypt.compare(password, user.password);
        if (!pass) { return res.error(401, "Bad password") }

        // const refresh = jwt.verify(tokens.refresh_token, process.env.JWT_SECRET);
        const ip = req.connection.remoteAddress
        const ua = req.headers['user-agent']
        const id = user.id
        const role = user.role
        const exp = process.env.JWT_REFRESH_EXP

        const token = {
            access: jwt.sign({ id, username, role, remember, ip, ua, pass: bcrypt.hashSync(user.password, 9) }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_ACCESS_EXP
            }),
            refresh: jwt.sign({ id: user.id, pass: bcrypt.hashSync(user.password, 9) }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_REFRESH_EXP
            })
        }
        if (!token.access.length || !token.refresh.length) { return res.error(401, "Bad tokens"); }

        const session = { id, username, remember, ...token, exp, ip, ua }

        if (session) {
            await sessions.read()
            sessions.data.items.filter(o => o.username !== session.username).push(session)
            await sessions.write()

            if (remember) {
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

    } catch (err) {
        console.log("err: ", err)
        res.error(401, err);
    }
}