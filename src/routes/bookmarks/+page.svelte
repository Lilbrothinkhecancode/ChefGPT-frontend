<script>
    import { onMount } from 'svelte';
    import { bookmarkedRecipes } from '../../utils/stores.js'; 
    import { user } from '../../utils/stores.js';// import bookmarkedRecipes store
    import { getTokenFromLocalStorage } from '../../utils/auth.js'; // import getTokenFromLocalStorage function

    let recipes = [];
    let isLoggedIn = false;
    let userId;

    onMount(() => {
        const token = getTokenFromLocalStorage();
        if (token) {
            isLoggedIn = true;
        }
    });

    user.subscribe(value => {
    if (value) {
        userId = value.id;
        isLoggedIn = true;
    } else {
        isLoggedIn = false;
    }
});

bookmarkedRecipes.subscribe(value => {
    if (value) {
        recipes = value.filter(recipe => recipe.userId === userId);
    }
});
</script>

{#if isLoggedIn}
    <div class="flex flex-wrap justify-center">
        {#each recipes as recipe, index (index)}
            <div class="max-w-sm rounded overflow-hidden shadow-lg m-4 flex-shrink-0">
                <img class="w-full" src={recipe.image} alt={recipe.title}>
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{recipe.title}</div>
                </div>
                <div class="px-6 pt-4 pb-2 flex items-center justify-center">
                    <a href="{recipe.url}" class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-red-600 rounded shadow">
                        View Recipe
                    </a>
                </div>
            </div>
        {/each}
    </div>
    {:else}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Holy smokes!</strong>
        <span class="block sm:inline">You must be <a href="/users/login" class="underline text-red-500">logged in</a> to view your saved recipes</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
    </div>
    {/if}

