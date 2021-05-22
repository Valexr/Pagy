const dbs = {}
function db(file) {
    dbs[file] ||= new Low(new JSONFile(`data/${file}.json`))
    return dbs[file]
}

table.find(i => i.id === +req.query.id)