import jwt from "jsonwebtoken";
import cookie from "cookie";

export default function token(req, res, next) {
    console.log(req.headers.cookie)
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            const ip = req.connection.remoteAddress
            const agent = req.headers['user-agent']

            console.log('token: ', verified, ip, agent)
            next();
        } catch (err) {
            switch (err.message) {
                case 'jwt expired': res.error(401, err.message)
                    break
                default: res.error(400, err.message) // invalid signature, jwt malformed, jwt must be provided
                    break
            }
            console.log("tokenERR: ", err.message, err.expiredAt)
        }
    } else if (req.headers.cookie) {
        try {
            const cookies = cookie.parse(req.headers.cookie)
            if (cookies.sid.length) next()
            else return
        } catch (err) {
            console.log(err)
        }
    } else {
        res.error(400, 'token not provided')
    }
}