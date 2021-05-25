import DB from "$lib/db"

let base, pattern = '/:base/:table'

async function connect(req, _res, next) {
    base = await DB.connect(req.params.base, req.params.table)
    next()
}

export default function (app) {

    app.use(pattern, connect)

    app.get(pattern, async (req, res) => {
        const hasquery = Object.keys(req.query).length
        const all = req.params.table === 'all'

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
    })

    app.post(pattern, async (req, res, _next) => {
        const meta = { id: Date.now(), create: Date.now(), update: Date.now(), role: req.query.role }
        await base.insert({ ...req.body, ...meta })
        const items = base.match(req.query)
        res.json(items)
    })

    app.put(pattern, async (req, res, _next) => {
        const meta = { ...req.body, update: Date.now() }
        await base.update(req.query.id, meta)
        const items = base.match(req.query)
        res.json(items)
    })

    app.patch(pattern, async (req, _res, next) => {
        base.path(req.query.patch)
        await base.write()
        next()
    })

    app.delete(pattern, async (req, res, _next) => {
        req.query.prop
            ? await base.deleteprop(req.query.prop)
            : await base.delete(req.query)
        delete req.query.id
        const items = base.match(req.query)
        res.json(items)
    })

}