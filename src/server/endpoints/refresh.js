import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { db } from "$lib/db"

const users = db('users')
const sessions = db('sessions')

export default async function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (verified) {
            await users.read()
            const user = users.data.items.find(i => i.id === verified.id)

            // req.cookies = cookie.parse(req.headers.cookie || '');
            // const access = req.cookies.sid
            // const acc = jwt.verify(access, 'secret');

            const access = jwt.sign({ id: user.id, pass: bcrypt.hashSync(user.password, 9) }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_ACCESS_EXP
            });
            res.json({ access, id: user.id, username: user.username, refreshexp: verified.exp })
            // console.log(user, verified)
        } else {
            console.log("Token filed")
            res.error(401, "Token filed");
        }
    } catch (err) {
        console.log("err: ", err)
        res.error(401, err);
    }
}