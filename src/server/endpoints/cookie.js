import bcrypt from "bcryptjs";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import DB from "$lib/db"

export default async function (req, res, next) {
    if (req.headers.cookie) {
        try {
            const cookies = cookie.parse(req.headers.cookie)
            const ip = req.connection.remoteAddress
            const ua = req.headers['user-agent']

            if (cookies.sid) {
                const SESSIONS = await DB.connect('sessions', 'items')
                const session = SESSIONS.id(atob(cookies.sid))
                if (session.id) {
                    const verified = ip.localeCompare(session.ip) === 0 && ua.normalize() === session.ua.normalize()
                    // const access = jwt.verify(session.access, process.env.JWT_SECRET);
                    // const refresh = jwt.verify(session.refresh, process.env.JWT_SECRET);
                    // const pass = await bcrypt.compare(user.password, verified.pass)
                    // if (!pass) { return res.error(401, "Bad password"); }
                    const user = { userid: session.userid, username: session.username }
                    console.log('cookie: ', cookies, session, user, verified)
                    req.url.includes('cookie') ? res.json(user) : verified && next()
                }
            } else next()

        } catch (err) {
            console.log("cookieERR: ", err)
            res.error(400, err, {
                'Set-Cookie': cookie.serialize('sid', '', { maxAge: 0, path: '/' })
            });
        }
    } else if (req.headers.authorization) {
        next()
    } else {
        res.error(400, 'cookie not provided', {
            'Set-Cookie': cookie.serialize('sid', '', { maxAge: 0, path: '/' })
        });
    }
}