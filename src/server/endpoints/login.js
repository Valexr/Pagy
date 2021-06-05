import bcrypt from "bcryptjs";
import { nanoid } from 'nanoid';
import cookie from "cookie";
import DB from "$lib/db";


export default async function (req, res, next) {
    try {
        const { username, password, remember } = req.body;

        const USERS = await DB.connect('users')
        const user = USERS.one({ username })
        if (!user) { return res.error(400, "User not found") }

        const pass = await bcrypt.compare(password, user.password);
        if (!pass) { return res.error(401, "Bad password") }

        const ip = req.connection.remoteAddress
        const ua = req.headers['user-agent']
        const sessionid = nanoid()
        const session = {
            id: sessionid,
            userid: user.id,
            role: user.role,
            username,
            remember,
            ...(remember && { maxAge: 31536000 }),
            ip, ua,
            create: Date().toLocaleString(),
            exp: remember ? new Date(31536000 * 1000 + Date.now()).toString() : 'Session'
        }
        const client = { userid: session.userid, username: session.username, role: session.role, exp: session.exp, ...(remember && { maxAge: 31536000 }) }

        const SESSIONS = await DB.connect('sessions')
        await SESSIONS.replace({ username }, session)

        res.writeHead(200, {
            'Set-Cookie': cookie.serialize('sid', btoa(sessionid), { ...(remember && { maxAge: 31536000 }), path: '/', httpOnly: true, sameSite: 'lax' })
        });
        // res.setHeader('Set-Cookie', `sid=${btoa(sessionid)}; ${remember && 'Max-Age=31536000'}; Path=/; HttpOnly; SameSite=Lax`);
        res.end(JSON.stringify(client))

    } catch (err) {
        console.log("loginERR: ", err)
        res.error(401, err);
    }
}