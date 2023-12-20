<script>
    import { onMount } from 'svelte';
      import { get } from 'svelte/store';
      import { _searchQuery } from './+page';
      import { PUBLIC_SPOON_API_KEY } from '$env/static/public';
      import SvelteMarkdown from 'svelte-markdown';
    
      let results = [];
      let query = get(_searchQuery);
      
    
      onMount(() => {
    homeSearch(query);
  });
      

  async function homeSearch (query) {
        try {
          const apiKey = PUBLIC_SPOON_API_KEY;
          const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
          const url = `${apiUrl}?apiKey=${apiKey}&query=${query}&addRecipeInformation=true&addRecipeNutrition=true`;
    
          const response = await fetch(url);
          console.log(response)
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          results = data.results
          console.log(data)
          return data 
          
        
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      async function searchRecipes (evt) {
        try {
          let query = evt.target['search'].value;
          const apiKey = PUBLIC_SPOON_API_KEY;
          const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
          const url = `${apiUrl}?apiKey=${apiKey}&query=${query}&addRecipeInformation=true&addRecipeNutrition=true`;
    
       
          const response = await fetch(url);
          console.log(response)
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          results = data.results
          console.log(data)
          return data 
          
        
        } catch (error) {
          console.error('Error:', error);
        }
      };
    </script>
    
    
  
   
    <form on:submit={searchRecipes} class="w-7/12 pt-4 pl-20">
            <div class="flex">
                <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                <button id="dropdown-button" data-dropdown-toggle="dropdown"
                    class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-white dark:hover:bg-gray-200 dark:focus:ring-gray-200 dark:text-black dark:border-gray-300 dark:border-s-gray-300"
                    type="button">All categories <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 4 4 4-4" />
                    </svg></button>
                <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                        <li>
                            <button type="button"
                                class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                        </li>
                        <li>
                            <button type="button"
                                class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                        </li>
                        <li>
                            <button type="button"
                                class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                        </li>
                        <li>
                            <button type="button"
                                class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                        </li>
                    </ul>
                </div>
                <div class="relative w-full">
                    <input type="search" id="search"
                        class="block p-4 w-full z-20 text-sm text-black bg-white rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-s-gray-300 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:border-blue-500"
                        placeholder="Search Food, Ingredients and Recipes" required>
                    <button type="submit"
                        class="absolute top-0 end-0 p-4 text-sm font-medium h-full text-white bg-rose-700 rounded-e-lg border border-rose-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span class="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
        
        
    
        <div class="grid grid-cols-3 md:grid-cols-3 gap-6 pr-24 pl-24 pt-24">
                    {#each results as recipe (recipe.id)}
                        <div>
    
                            <img class="items-start pb-4 max-w-sm rounded" src={recipe.image} alt={recipe.title}>    
                            <h3 class = "text-xl text-black pr-4">{recipe.title}   </h3> 
                            <p class='text-xs text-slate-500' pb-6>  {recipe.nutrition.nutrients[0].amount} kcal </p>
                           
                            
    
                            <div class='pr-14 pb-4 pt-3'>
                                <SvelteMarkdown source={recipe.summary.slice(0, 180)}... />
                            </div>
                        </div> 
                    {/each}
                </div>
