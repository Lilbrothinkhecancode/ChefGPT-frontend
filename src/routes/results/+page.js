import { writable } from 'svelte/store';

const initialQuery = '';
export const _searchQuery = writable(initialQuery)

