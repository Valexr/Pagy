import jwt from "jsonwebtoken";
import cookie from "cookie";

export default function token(req, res, next) {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            console.log('token: ', verified)
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
            if (cookies.sid && cookies.sid.length) next()
            else res.error(400, 'cookie invalid');
        } catch (err) {
            console.log('tokenERR:', err)
        }
    } else {
        res.error(400, 'token not provided')
    }
}