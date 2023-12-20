<script>
    import { recipes } from '../../../utils/stores.js';
    import { page } from '$app/stores';

    let slug = $page.params.slug;

    $: if ($recipes[slug] && $recipes[slug].image) {
        console.log($recipes[slug].image);
    }
</script>

<style>
    .container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        gap: 20px;
        position: relative;
        margin-left: auto;
    }
    .card {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 10px;
        margin: 10px 0 10px 20px;
        width: 100%;
        max-width: 600px;
        text-align: center;
    }
    .image-card {
        border: none;
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .image-card img {
        width: 100%;
        max-width: 500px;
        height: auto;
    }
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 50px; /* Add this line */
    }
</style>

{#if $recipes[slug]}
    <div class="container">
        <div class="content">
            <div class="card title-card">
                <h2>{$recipes[slug].title}</h2>
            </div>
            <div class="card">
                <p>{$recipes[slug].description}</p>
            </div>
            <div class="card ingredients-card">
                <p>Ingredients:<br>{#each $recipes[slug].ingredients.split(', ') as ingredient}<br>{ingredient}{/each}</p>
            </div>
            <div class="card">
                <p>Prep Time:<br>{$recipes[slug].prepTime}</p>
            </div>
        </div>
        {#if $recipes[slug].image}
            <div class="card image-card">
                <img src={$recipes[slug].image} alt={$recipes[slug].title}> <!-- $recipes[slug].image is a data URL -->
            </div>
        {/if}
    </div>
{/if}