<script>
  import "../app.css";
  import { onMount, onDestroy } from 'svelte';
  import { logOut, isLoggedIn } from '../utils/auth.js';
  import { IsLoggedIn } from '../utils/stores.js';


  export let title = 'ChefGPT';

  const handleStorageChange = () => {
    console.log('Storage change detected');
    console.log('localStorage:', localStorage);
    IsLoggedIn.set(isLoggedIn());
    console.log('New IsLoggedIn:', IsLoggedIn);
  };

  onMount(async () => {
    setTimeout(async () => {
      IsLoggedIn.set(await isLoggedIn());
    }, 0);
  });

  onDestroy(() => {
    window.removeEventListener('storage', handleStorageChange);
  });
</script>

<header class="bg-white text-black relative h-20 pl-20 flex justify-between items-center">
  <div class="flex items-center">
    <a href="/" class="font-black text-2xl">{title}</a>
  </div>

  <div class="flex items-center gap-5">
    <nav>
      <a href="/recipes" class="font-light">Recipes</a>
      <a href="/users/profile" class="font-light">My Kitchen</a>
      <a href="/bookmarks" class="font-light">Bookmarks</a>
    </nav>


    <div class="flex items-center">
      {#if $IsLoggedIn}
        <button on:click={logOut} class="mr-4 font-light" aria-label="Log Out">Log Out</button>
      {:else}
        <a href="/users/new" class="mr-4 font-light">Sign Up</a>
        <a href="/users/login" class="font-light">Login</a>
      {/if}
    </div>
  </div>
</header>

<style>
  nav {
    display: flex;
    gap: 20px; 
  }
</style>

<body class="bg-white">

</body>

<footer class="bg-slate-50">

</footer>

<slot />

  <slot />

