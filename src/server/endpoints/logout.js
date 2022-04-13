import cookie from 'cookie';
import DB from '$lib/db';
import { atob } from '$lib/utils';

export default async function (req, res, next) {
    if (req.headers.cookie)
        try {
            const cookies = cookie.parse(req.headers.cookie);
            const SESSIONS = await DB.connect('sessions', 'items');
            const session = SESSIONS.id(atob(cookies.sid));
            const message = session.maxAge ? { username: session.username } : {};
            // !session.maxAge &&
            res.setHeader('Set-Cookie', 'sid=; max-age=0; path=/');
            res.end(JSON.stringify(message));
        } catch (err) {
            console.log('logoutERR: ', err);
            res.error(401, err);
        }
    else
        res.error(400, 'cookie not provided', {
            'Set-Cookie': 'sid=; max-age=0; path=/',
        });
}
