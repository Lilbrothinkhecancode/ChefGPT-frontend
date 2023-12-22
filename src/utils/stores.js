import { writable } from 'svelte/store';
export const IsLoggedIn = writable(false);

function createPersistedStore(key, startValue) {
    const isBrowser = typeof window !== 'undefined';
    const storedValue = isBrowser ? localStorage.getItem(key) : null;
    const initialValue = storedValue ? JSON.parse(storedValue) : startValue;
    const store = writable(initialValue);

    store.subscribe(value => {
        if (isBrowser) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    });

    return store;
}

export const bookmarkedRecipes = createPersistedStore('bookmarkedRecipes', []);


function createRecipesStore() {
    const isBrowser = typeof window !== 'undefined';
    const initialRecipes = isBrowser && localStorage.getItem('recipes')
        ? JSON.parse(localStorage.getItem('recipes'))
        : {};

    const { subscribe, set, update } = writable(initialRecipes);

    return {
        subscribe,
        addRecipe: (id, recipe) => update(recipes => {
            const newRecipes = { ...recipes, [id]: recipe };
            if (isBrowser) {
                localStorage.setItem('recipes', JSON.stringify(newRecipes));
            }
            return newRecipes;
        }),
        removeRecipe: (id) => update(recipes => {
            const { [id]: _, ...remainingRecipes } = recipes;
            if (isBrowser) {
                localStorage.setItem('recipes', JSON.stringify(remainingRecipes));
            }
            return remainingRecipes;
        }),
        reset: () => {
            if (isBrowser) {
                localStorage.removeItem('recipes');
            }
            set({});
        }
    };
}

export const recipes = createRecipesStore();

function createUserStore() {
    const isBrowser = typeof window !== 'undefined';
    const initialUser = isBrowser && localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null;

    const { subscribe, set, update } = writable(initialUser);

    return {
        subscribe,
        setUser: (user) => {
            if (isBrowser) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            set(user);
        },
        removeUser: () => {
            if (isBrowser) {
                localStorage.removeItem('user');
            }
            set(null);
        }
    };
}

export const user = createUserStore();

