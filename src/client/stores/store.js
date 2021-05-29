import { writable, derived, get } from 'svelte/store';
import { asyncable, syncable } from 'svelte-asyncable';

import { path, query } from "svelte-pathfinder";

export const items = writable([])
export const filters = writable({})
export const navbar = writable(false)
export const sidebar = writable(false)
export const contextMenu = writable({
    isOpen: false,
    id: 0,
    pos: { x: 0, y: 0 }
});

export const asyncData = asyncable(async ($path) => {
    return getData(`/api/${$path.toString()}`);
}, null, [path]);

export const data = syncable(asyncData, null);

async function getData(query, page) {
    try {
        const data = await db.get(
            `/${page.alias}/items${query.split("&id")[0]}`
        );
        $items = data.items;
        $filters = data.filters;
        return data;
    } catch (err) {
        console.log(err);
    }
}

// export const filters = derived([items, filters, query], ([$items, $filters, $query]) => {
//     Object.entries($filters).map(([k,v]) => {

//     })
// })