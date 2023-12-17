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

  // Triggered after successful login or signup
  function handleSuccessfulAuthentication() {
    IsLoggedIn.set(true);
    window.addEventListener('storage', handleStorageChange);
  }

  onMount(async () => {
    // Delay the initialization
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
        <!-- Display "Log Out" button when the user is authenticated -->
        <button on:click={logOut} class="mr-4 font-light" aria-label="Log Out">Log Out</button>
      {:else}
        <!-- Display "Sign Up" and "Log In" links when the user is not authenticated -->
        <a href="/users/new" class="mr-4 font-light">Sign Up</a>
        <a href="/users/login" class="font-light">Login</a>
      {/if}
    </div>
  </div>
</header>

<body class="bg-white">
  <!-- Your body content goes here -->
</body>

<footer class="bg-slate-50">
  <!-- Your footer content goes here -->
</footer>

<slot />
