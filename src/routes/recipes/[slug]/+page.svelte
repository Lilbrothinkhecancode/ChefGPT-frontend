<script>
    import { getTokenFromLocalStorage } from '../../../utils/auth.js';
    import { bookmarkedRecipes } from '../../../utils/stores.js';
    export let data;
    import SvelteMarkdown from 'svelte-markdown';
    import { user, IsLoggedIn } from '../../../utils/stores.js'; // import user and IsLoggedIn stores
    let isSaved = false;

    let isLoggedIn = false;
    let userId; // Add this line

    // Subscribe to the IsLoggedIn and user stores
    IsLoggedIn.subscribe(value => {
        isLoggedIn = value;
    });

    user.subscribe(value => {
        console.log('User store value:', value); // Log the value of the user store
        if (value) {
            userId = value.id;
        }
    });

    const saveRecipe = async () => {
    const token = getTokenFromLocalStorage(); // Get the token

    if (!token) {
        console.error('No token found');
        return;
    }

    console.log('Backend API URL:', import.meta.env.VITE_PUBLIC_BACKEND_API); // Log the backend API URL

    const response = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_API}/recipe`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ url: window.location.href }) // Send recipeUrl in the body
});
if (response.ok) {
            const recipe = await response.json();
            bookmarkedRecipes.update(recipes => [...recipes, { url: window.location.href, title: data.recipe.title, image: data.recipe.image }]);
            isSaved = true;
        }
};
</script>

<div class="pt-8 pl-24 pr-24"> 
    <p class="text-3xl pb-2">
        {data.recipe.title}
    </p>
    <div class="flex flex-row gap-8">
        <div>
            <img class="items-start pb-4 max-w-sm rounded" src={data.recipe.image} alt={data.recipe.title}>  
            <div class="flex flex-row">
                <div class="meal prep button mr-2">
                    <button class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-red-600 rounded shadow flex items-center justify-center">
                        <svg viewBox="0 0 24 24" height="18" width="18" class="mr-2">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#ffffff"></path>
                        </svg>
                        <span>Button</span>
                    </button>
                </div>
                <div class="save recipe button mr-2">
                    <button class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-red-600 rounded shadow flex items-center justify-center" on:click={saveRecipe}>
                        <svg viewBox="0 0 24 24" height="18" width="18" class="mr-2">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" fill="#ffffff"></path>
                        </svg>
                        <span>
                            {#if isSaved}
                                Saved
                            {:else}
                                Save
                            {/if}
                        </span>
                    </button>
                </div>
                <div class="URL button">
                    <button class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 border border-red-600 rounded shadow flex items-center justify-center">
                        <svg viewBox="0 0 24 24" height="18" width="18" class="mr-2">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M18 16c-.79 0-1.5.31-2.03.81L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.53.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.48.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.05 4.12c-.05.22-.09.45-.09.69 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3zm0-12c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="#ffffff"></path>
                        </svg>
                        <span>Button</span>
                    </button>
                </div>
            </div>


            <p class="text-xl"> Summary </p>
            <div class='pr-14 pb-4 pt-3'>
                <SvelteMarkdown source={data.recipe.summary} />
            </div>

            <div class="pr-24 pb-8">
                <p class="text-xl"> Instructions </p>
                <SvelteMarkdown source={data.recipe.instructions} />
            </div>
            <div>
                
            </div>
            
        </div>
        
    </div>
</div>






