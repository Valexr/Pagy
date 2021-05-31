import cookie from "cookie";
import DB from "$lib/db"


export default async function (req, res, next) {
    console.log(req.headers.cookie)
    if (req.headers.cookie)
        try {
            const cookies = cookie.parse(req.headers.cookie)
            const SESSIONS = await DB.connect('sessions', 'items')
            const session = SESSIONS.id(atob(cookies.sid))
            !session.maxAge && res.setHeader('Set-Cookie', 'sid=; max-age=0; path=/');
            res.end(JSON.stringify('logout'))

        } catch (err) {
            console.log("logoutERR: ", err)
            res.error(401, err);
        }
    else res.error(400, 'cookie not provided', {
        'Set-Cookie': cookie.serialize('sid', '', { maxAge: 0, path: '/' })
    });
}