function arrayDiff(a, b) {
    if (a.length && b.length) {
        const d = b.map((i) => i);
        a = a.filter((i) => !d.includes(i));
        return a
    } else {
        return a
    }
}

// Takes an array of objects and the property by which they should be grouped.
// Produces an object of arrays keyed by the specified property values.
// 
// Provide multiple keys if your data is nested:   groupBy(dogs, 'values', 'emoji')
// 
// Ex: [{id: 1, group: 'A'}, {id: 2, group: 'B'}, {id: 3, group: 'A'}],   'group'
//     =>
//     {A: [{id: 1, group: 'A'}, {id: 3, group: 'A'}], B: [{id: 2, group: 'B'}]}
export function groupBy(data, ...keys) {
    // Ex: {values: {color: 'red'}}, ['values', 'color'] => 'red'
    const getGroupFromItem = (item, keys) => {
        return (keys.length > 1)
            ? getGroupFromItem(item[keys[0]], keys.slice(1))
            : item[keys[0]]
    }

    return data.reduce((results, item) => {
        // Get the first instance of the key by which we're grouping
        var group = getGroupFromItem(item, keys);

        // Ensure that there's an array to hold our results for this group
        results[group] = results[group] || [];

        // Add this item to the appropriate group within results
        results[group].push(item);

        // Return the updated results object to be passed into next reduce call
        return results;
    },

        // Initial value of the results object
        Promise.resolve({})
    );
};

export function group(arr, keys) {
    return arr.reduce((storage, item) => {
        const objKey = keys.map((key) => `${item[key]}`).join(":"); //should be some unique delimiter that wont appear in your keys
        if (storage[objKey]) {
            storage[objKey].push(item);
        } else {
            storage[objKey] = [item];
        }
        return storage;
    }, {});
}

// function groupBy(xs, key) {
//     return xs.reduce((rv, x) => {
//         (rv[x[key]] = rv[x[key]] || []).push(x);
//         return rv;
//     }, {});
// }
// const red = group(items, [keys[0], keys[1], keys[2][0].name]);