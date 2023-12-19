<script>
    import { recipes } from '../../utils/stores.js';
    import { goto } from '$app/navigation';

    let title = '';
    let description = '';
    let ingredients = '';
    let prepTime = '';
    let image;

    function handleSubmit() {
        const id = Date.now().toString();
        recipes.update(currentRecipes => ({
            ...currentRecipes,
            [id]: { title, description, ingredients, prepTime, image }
        }));
        goto(`/recipes/${id}`);
    }

    function handleImageUpload(event) {
        image = event.target.files[0];
    }
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    }
    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    input, textarea {
        border: 1px solid #000;
        padding: 10px;
        width: 100%;
    }
</style>

<form on:submit|preventDefault={handleSubmit}>
    <label>
        Title:
        <input bind:value={title} type="text" required>
    </label>
    <label>
        Description:
        <textarea bind:value={description} required></textarea>
    </label>
    <label>
        Ingredients:
        <textarea bind:value={ingredients} required></textarea>
    </label>
    <label>
        Prep Time:
        <input bind:value={prepTime} type="text" required>
    </label>
    <label>
        Image:
        <input type="file" on:change={handleImageUpload} required>
    </label>
    <button type="submit">Submit</button>
</form>