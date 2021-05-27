import DB from "$lib/db"

let base, pattern = '/:base/:table'

async function connect(req, _res, next) {
    try {
        base = await DB.connect(req.params.base, req.params.table)
        next()
    } catch (err) {
        console.log('error: ', err)
        next()
    }
}

export default function (app) {

    app.use(pattern, connect)

    app.get(pattern, async (req, res, next) => {
        const hasquery = Object.keys(req.query).length
        const all = req.params.table === 'all'
        try {
            if (hasquery) {
                const filters = base.filters(req.query)
                const items = req.query.q
                    ? base.search(req.query.q)
                    : base.match(req.query)
                req.query.id
                    ? res.json(base.id(req.query.id))
                    : res.json({ items, filters })

            } else if (all) {
                res.json(base.data)

            } else {
                res.json(base.table)
            }
        } catch (err) {
            console.log('error: ', err)
            next()
        }
    })

    app.post(pattern, async (req, res, next) => {
        const meta = { id: Date.now(), create: Date.now(), update: Date.now(), role: req.query.role }
        try {
            await base.insert({ ...req.body, ...meta })
            delete req.query.id
            const items = base.match(req.query)
            res.json(items)
        } catch (err) {
            console.log('error: ', err)
            next()
        }
    })

    app.put(pattern, async (req, res, next) => {
        const meta = { ...req.body, update: Date.now() }
        try {
            await base.update(req.query.id, meta)
            delete req.query.id
            const items = base.match(req.query)
            res.json(items)
        } catch (err) {
            console.log('error: ', err)
            next()
        }
    })

    app.patch(pattern, async (req, _res, next) => {
        try {
            base.patch(req.query.patch)
            await base.write()
            next()
        } catch (err) {
            console.log('error: ', err)
            next()
        }
    })

    app.delete(pattern, async (req, res, _next) => {
        try {
            req.query.prop
                ? await base.deleteprop(req.query.prop)
                : await base.delete(req.query)
            delete req.query.id
            const items = base.match(req.query)
            res.json(items)
        } catch (err) {
            console.log('error: ', err)
            next()
        }
    })

}