import { writable, derived, get } from 'svelte/store';

export const addopen = writable(false);
export const addBookForm = writable({
    title: '',
    author: '',
    description: '',
});
export const editForm = writable({
    id: '',
    title: '',
    author: '',
    description: '',
});
