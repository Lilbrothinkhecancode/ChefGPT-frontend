<script>
    import { recipes } from '../../utils/stores.js';
    import { goto } from '$app/navigation';
    import { isLoggedIn } from '../../utils/auth.js';

    let title = '';
    let description = '';
    let ingredients = '';
    let prepTime = '';
    let image;

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                image = reader.result; // This is a data URL
            };
            reader.readAsDataURL(file);
        }
    }

    async function handleSubmit() {
        // Check if user is logged in
        const loggedIn = await isLoggedIn();
        console.log('loggedIn:', loggedIn); // Log the value of loggedIn
        if (!loggedIn) {
            alert('You must be logged in to upload a recipe.');
            return;
        }

        try {
            const id = Date.now().toString();
            recipes.addRecipe(id, { title, description, ingredients, prepTime, image }); // image is a data URL
            goto(`/recipes/${id}`);
        } catch (error) {
            console.error('Error in handleSubmit:', error); // Log any errors
        }
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