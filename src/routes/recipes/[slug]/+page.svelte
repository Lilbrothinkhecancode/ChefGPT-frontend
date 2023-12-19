<script>
    export let data
    import SvelteMarkdown from 'svelte-markdown';
    console.log(data)
    
</script>


<div class="pt-8 pl-24 pr-24"> 
    <p class="text-3xl pb-2">
        {data.recipe.title}
    </p>
    <div class="flex flex-row gap-8">
        <div>
            <img class="items-start pb-4 max-w-sm rounded" src={data.recipe.image} alt={data.recipe.title}>  

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



