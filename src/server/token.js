import jwt from "jsonwebtoken";
// import { JWT_SECRET } from 'env'

export default function token(req, res, next) {
    if (req.headers.authorization) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            console.log('verified: ', verified)
            next();
        } catch (err) {
            switch (err.message) {
                case 'jwt expired': res.error(401, err.message)
                    break
                case 'invalid signature': res.error(400, err.message)
                    break
                case 'jwt malformed': res.error(400, err.message)
                    break
                case 'jwt must be provided': res.error(400, err.message)
                    break
            }
            console.log("error: ", err.message, err.expiredAt)
        }
    } else {
        res.error(400, 'token not provided')
    }
}