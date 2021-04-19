function log(req, res, next) {
    console.log({
        'req.method': req.method,
        // 'req.headers': req.headers,
        'req.url': req.url,
        'req.path': req.path,
        'req.query': req.query,
        'req.params': req.params,
        'req.body': req.body
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
            // decode = decodeURIComponent(data);
            req.body = JSON.parse(data);
            next()
        })
    } else {
        next()
    }
}

export { log, json, body }
