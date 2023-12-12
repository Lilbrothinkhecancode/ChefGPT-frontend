<script>
    import "../app.css";
    export let title = 'ChefGPT';

</script>


<header class="bg-white text-black relative h-20">
    <div class="p-2 flex items-center h-full">
        <a href="/" class="text-2xl">{title}</a>
    </div>


    <div class="absolute top-0 right-0 p-2 flex items-center h-full">
        <a href="/recipes" class="mr-4">Recipes</a>
        <a href="/users/profile" class="mr-4">My Kitchen</a>
        <a href="/bookmarks" class="mr-4">Bookmarks</a>
        <a href="/users/new" class="mr-4">Sign Up</a>
        <a href="/users/login">Login</a>
    </div>
</header>
  <slot />