import { writable, derived, get } from 'svelte/store';
import { path, query } from "svelte-pathfinder";

export const items = writable([])
export const filters = writable({})
export const navbar = writable(false)
export const sidebar = writable(false)

// export const filters = derived([items, filters, query], ([$items, $filters, $query]) => {
//     Object.entries($filters).map(([k,v]) => {

//     })
// })