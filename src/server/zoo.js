import { client } from './db'

export function zoo() {
    // https://medium.com/@stockholmux/using-the-redis-multi-object-in-node-js-for-fun-and-profit-daf8cb62b86b
    const
        clientAnimals = [
            { name: 'Button', species: 'Canis familiaris', lastVisit: 1430456400000 },
            { name: 'Wilberforce', species: 'Felis catus', lastVisit: 1413694800000 },
            { name: 'Spot', species: 'Canis familiaris', lastVisit: 1394686800000 },
            { name: 'TardarSauce', species: 'Felis catus', lastVisit: 1424844000000 },
            { name: 'Muffin', species: 'Capra hircus', lastVisit: 1359266400000, notes: 'Unusual colouration' }
        ],
        importMulti = client.multi(),
        dateMin = new Date(2015, 1, 1).getTime(),
        visitIndex = rk('animal', 'lastVisit');
    //see “Dancing around strings in Node.js and Redis” https://medium.com/@stockholmux/dancing-around-strings-in-node-js-and-redis-2a8f91ebe0bf
    function rk() {
        return Array.prototype.slice.call(arguments).join(':')
    }

    clientAnimals.forEach((anAnimal) => {
        const detailHashKey = rk('animal', 'details', anAnimal.name)
        importMulti.hmset(detailHashKey, anAnimal);
        //adding an “index” by the last visit
        importMulti.zadd(visitIndex, anAnimal.lastVisit, detailHashKey);
    });

    console.log(clientAnimals)
    //now lets get any animals that are due for a checkup
    importMulti.zrangebyscore('animal:lastVisit', '-inf', dateMin);
    const resultArrayIndex = importMulti.queue.length - 2;

    importMulti.exec((err, results) => {
        if (err) { throw err; } else {
            console.log('results[resultArrayIndex]', results[resultArrayIndex]);
            console.log(results);
            // client.quit();
        }
    });
}
