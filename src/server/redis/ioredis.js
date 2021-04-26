db.sadd('set', 'member1');
db.scard('set').then(r => console.dir(r))
// db.keys('*').then(r => console.dir(r))

function printObjectDetails(key, obj) {
    console.log(`${key} object`)
    console.log('-'.repeat(26));
    for (const prop in obj) {
        console.log(`${prop} = ${obj[prop]}`);
    }
}

async function main() {
    try {
        const keys = await db.keys('*')
        keys.forEach(async key => {
            const shamuObject = await db.hgetall(key);
            printObjectDetails(key, shamuObject);
        })
    } catch (error) {
        console.error(error);
    }
    db.disconnect();
}

// main();

const stream = db.scanStream({ type: 'hash', match: 'animal*' });
let arr = []
stream.on("data", async (resultKeys) => {
    for (let i = 0; i < resultKeys.length; i++) {
        stream.pause();
        let obj = await db.hgetall(resultKeys[i])
        arr = [...arr, { id: resultKeys[i], ...obj }]
        stream.resume();
    }
});
stream.on("end", (res) => {
    console.log("all keys have been visited");
    console.log('iores: ', arr, arr.length)
    // db.disconnect();
});

let key = null,
    obj = null,
    data = [],
    multi = db.multi()
db
    .pipeline()
    .keys('book:*', (e, r) => multi.hgetall(r, (e, r) => console.log(r)))
    // .set("foo", "bar")
    // .get("foo", (err, result) => {
    //     // result === 'bar'
    // })
    .exec((e, r) => {
        console.log('r: ', r, data)
        // result[1][1] === 'bar'
    });

// stream.on("data", (resultKeys) => {
//     // `resultKeys` is an array of strings representing key names.
//     // Note that resultKeys may contain 0 keys, and that it will sometimes
//     // contain duplicates due to SCAN's implementation in Redis.
//     for (let i = 0; i < resultKeys.length; i++) {
//         console.log(resultKeys[i]);
//     }
// });
// stream.on("end", () => {
//     console.log("all keys have been visited");
// });
