import cookie from "cookie";
import jwt from "jsonwebtoken";

export default function cookieauth(req, res, next) {
    console.log(req.headers.cookie)
    try {
        const cookies = cookie.parse(req.headers.cookie)
        const verified = jwt.verify(cookies.sid, 'secret');

        console.log(cookies, verified)
        next()
    } catch (err) {

        next()
    }
}
