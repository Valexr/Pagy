import bcrypt from "bcryptjs";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import DB from "$lib/db"

export default async function (req, res, next) {
    if (req.headers.cookie) {
        try {
            const cookies = cookie.parse(req.headers.cookie)
            const sid = jwt.verify(cookies.sid, process.env.JWT_SECRET);
            const ip = req.connection.remoteAddress
            const agent = req.headers['user-agent']

            if (sid) {
                const SESSIONS = await DB.connect('sessions')
                const session = SESSIONS.id(sid.id)
                const access = jwt.verify(session.access, process.env.JWT_SECRET);
                const refresh = jwt.verify(session.refresh, process.env.JWT_SECRET);
                // const pass = await bcrypt.compare(user.password, verified.pass)
                // if (!pass) { return res.error(401, "Bad password"); }
                const user = { id: session.id, username: session.username }
                console.log('cookie: ', cookies, session, access, refresh)
                res.json(user)
            }

        } catch (err) {
            res.error(400, err, {
                'Set-Cookie': cookie.serialize('sid', '', { maxAge: 0, path: '' })
            });
            console.log("cookieERR: ", err)
        }
    } else next()
}