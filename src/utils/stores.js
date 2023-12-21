import { writable } from 'svelte/store';
export const IsLoggedIn = writable(false);


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