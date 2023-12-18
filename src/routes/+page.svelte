<script>
  import { goto } from '$app/navigation';
  import { _searchQuery } from '../routes/results/+page'
  

  let query = '';

function gotoResults() {
    _searchQuery.set(query);
    setTimeout(()=> goto('/results'), 0);
}




	
</script>

<main class="flex flex-col items-center h-screen">
	<h1 class="text-7xl text-slate-950 font-black mb-4 mt-10 pt-20">ChefGPT</h1>

 

    <form on:submit={gotoResults} class="w-7/12 pt-4">
        <div class="flex">
            <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
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
                <input type="search" id="search-dropdown" bind:value={query}
                    class="block p-4 w-full z-20 text-sm text-black bg-white rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-s-gray-300 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:border-blue-500"
                    placeholder="Search Food, Recipes or Ingredients" required>

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




<div>
    <div class="ml-72 pt-12 font-light mb">
        <h3 class="text-xl"> This Week's Trending </h3>
        <hr class="h-px my-2 bg-rose-200 border-0 dark:bg-rose-400 w-64 mb-4">
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-8 pr-72 pl-72 pb-64 pt-8">
        
        <div>
            <img class=" aspect-square object-cover responsive" src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGF8ZW58MHx8MHx8fDA%3D" alt="">
        </div>
        <div>
            <img class="aspect-square object-cover responsive" src="https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGFzdGF8ZW58MHx8MHx8fDA%3D" alt="">
        </div>
        <div>
            <img class="aspect-square object-cover responsive" src="https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBhc3RhfGVufDB8fDB8fHww" alt="">
        </div>
       
    
    </div>
</div>


</main>