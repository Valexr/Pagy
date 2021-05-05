import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import FileAsync from 'lowdb/adapters/FileAsync'

let adapter
// let adapter = new FileAsync('json/lowdb.json')
// const adapter = new FileAsync('json/lowdb.json', {
//     serialize: (data) => encrypt(JSON.stringify(data)),
//     deserialize: (data) => JSON.parse(decrypt(data))
// })
export const lowdb = () => low(adapter)

export function createdb(datatype, locale) {
    adapter = new FileAsync(`data/${datatype}${locale ? '-' + locale : ''}.json`)
}
