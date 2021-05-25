import cookie from "cookie";
import jwt from "jsonwebtoken";
import DB from "$lib/db"

export default async function (req, res, next) {
    console.log(req.headers.cookie)
    if (req.headers.cookie) {
        try {
            const cookies = cookie.parse(req.headers.cookie)
            const verified = jwt.verify(cookies.sid, process.env.JWT_SECRET);

            if (verified) {
                const USERS = await DB.connect('users')
                const user = USERS.id(verified.id)
                const pass = await bcrypt.compare(user.password, verified.pass)
                if (!pass) { return res.error(401, "Bad password"); }
                // console.log('cookies: ', cookies, verified, user)
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
}