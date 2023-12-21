import { writable } from 'svelte/store';
export const IsLoggedIn = writable(false);

function createPersistedStore(key, startValue) {
    const storedValue = localStorage.getItem(key);
    const initialValue = storedValue ? JSON.parse(storedValue) : startValue;
    const store = writable(initialValue);

    store.subscribe(value => {
        localStorage.setItem(key, JSON.stringify(value));
    });

    return store;
}

export const bookmarkedRecipes = createPersistedStore('bookmarkedRecipes', []);


function createRecipesStore() {
    const initialRecipes = localStorage.getItem('recipes')
        ? JSON.parse(localStorage.getItem('recipes'))
        : {};

    const { subscribe, set, update } = writable(initialRecipes);

    return {
        subscribe,
        addRecipe: (id, recipe) => update(recipes => {
            const newRecipes = { ...recipes, [id]: recipe };
            localStorage.setItem('recipes', JSON.stringify(newRecipes));
            return newRecipes;
        }),
        removeRecipe: (id) => update(recipes => {
            const { [id]: _, ...remainingRecipes } = recipes;
            localStorage.setItem('recipes', JSON.stringify(remainingRecipes));
            return remainingRecipes;
        }),
        reset: () => {
            localStorage.removeItem('recipes');
            set({});
        }
    };
}

export const recipes = createRecipesStore();

function createUserStore() {
    const initialUser = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null;

    const { subscribe, set, update } = writable(initialUser);

    return {
        subscribe,
        setUser: (user) => {
            localStorage.setItem('user', JSON.stringify(user));
            set(user);
        },
        removeUser: () => {
            localStorage.removeItem('user');
            set(null);
        }
    };
}

export const user = createUserStore();