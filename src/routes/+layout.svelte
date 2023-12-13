<script>
    import "../app.css";
    export let title = 'ChefGPT';

</script>


<header class="bg-white text-black relative h-20 pl-20">
    <div class="p-2 flex items-center h-full">
        <a href="/" class="font-black text-2xl">{title}</a>
    </div>


    <div class="absolute top-0 right-0 pr-20 flex items-center h-full gap-5">
        <a href="/recipes" class="mr-4 font-light ">Recipes</a>
        <a href="/users/profile" class="mr-4 font-light">My Kitchen</a>
        <a href="/bookmarks" class="mr-4 font-light ">Bookmarks</a>
        <a href="/users/new" class="mr-4 font-light">Sign Up</a>
        <a href="/users/login" class =" font-light">Login</a>
    </div>
</header>
<body class="bg-white">

</body>
<footer class="bg-slate-50">
    
</footer>
  <slot />