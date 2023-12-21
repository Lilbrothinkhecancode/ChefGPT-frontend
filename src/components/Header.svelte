<script>
    import { logOut } from '../utils/auth.js';
    import { onMount } from 'svelte';
    import { IsLoggedIn } from '../utils/stores.js';

</script>

<header class="bg-white text-black relative h-20 pl-20 ">
    <div class="p-2 flex items-center h-full">
        <a href="/" class="font-black text-2xl"> ChefGPT </a>
    </div>


    <div class="absolute top-0 right-0 pr-20 flex items-center h-full gap-5">
        <a href="/calendar" class="mr-4 font-light ">Calendar</a>
        <a href="/users/profile" class="mr-4 font-light">My Kitchen</a>
        <a href="/bookmarks" class="mr-4 font-light ">Bookmarks</a>
        <a href="/users/new" class="mr-4 font-light">Sign Up</a>
       

        {#if $IsLoggedIn == false}
        <a href="/users/login" class =" font-light">Login</a>
        {:else}
        <button class=" font-light" on:click={logOut}>Log Out</button>
        {/if}
     
    </div>
</header>