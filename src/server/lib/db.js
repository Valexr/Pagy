import { Low, JSONFile } from 'lowdb'
// import lodash from 'lodash'

const dbs = {}
export function db(file) {
    dbs[file] ||= new Low(new JSONFile(`data/${file}.json`))
    return dbs[file]
}

export const lowdb = (file) => new Low(new JSONFile(`data/${file}.json`))