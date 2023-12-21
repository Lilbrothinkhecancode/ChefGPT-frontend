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
    <p>You must be logged in to view your saved recipes.</p>
{/if}