import { lowdb } from './db'

export default lowdb._.mixin({
    add: function (a, v) {
        console.log('arr: ', a, 'val: ', v)
        let has = false
        a.some(i => {
            if (lowdb._.isEqual(i, v)) has = true
        })
        !has && a.push(v)
    }
})
