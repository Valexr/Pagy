
function log(req, res, next) {
    console.log({
        'req': {
            'connection': req.connection.remoteAddress,
            'agent': req.headers['user-agent'],
            'method': req.method,
            'headers': req.headers,
            'req.url': req.url,
            'req.path': req.path,
            'req.query': req.query,
            'req.params': req.params,
            'req.body': req.body
        },
        'res': {
            'status': res.statusCode,
            'headers': res.headers,
            'res.body': res.body
        }
    });
    next();
}


function json(req, res, next) {
    res.json = (obj) => {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify(obj));
    }
    next();
}

function body(req, res, next, data = '') {
    if (req.method === 'POST' || req.method === 'PUT') {
        req.on('data', chunk => {
            data += decodeURIComponent(chunk)
            // console.log(chunk, data)
        })
        req.on('end', (decode) => {
            console.log(data)
            // decode = decodeURIComponent(data);
            if (data) req.body = JSON.parse(data);
            next()
        })
    } else {
        next()
    }
}

function errors(req, res, next) {
    res.error = (code = 500, message, headers) => {
        res.writeHead(code, {
            "Content-Type": "application/json",
            ...headers
        });
        res.end(JSON.stringify(message));
    }
    next();
}


export default [log, json, body, errors]
