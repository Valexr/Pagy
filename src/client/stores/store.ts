import { writable, derived, get } from 'svelte/store';

import { path, query } from 'svelte-pathfinder';
import type { Page } from '@types';

export const items = writable([]);
export const filters = writable({});
export const navbar = writable(false);
export const sidebar = writable(false);
export const contextMenu = writable({
    isOpen: false,
    id: 0,
    pos: { x: 0, y: 0 },
});
