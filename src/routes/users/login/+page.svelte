<script>
  import { IsLoggedIn } from '../../../utils/stores.js';
  import { goto } from '$app/navigation';
  import { authenticateUser } from '../../../utils/auth.js';

  let email = '';
  let password = '';
  let error = '';
  let isSubmitting = false;

  async function handleLogin(evt) {
    isSubmitting = true;
    evt.preventDefault();

    const email = evt.target['email'].value;
    const password = evt.target['password'].value;

    const result = await authenticateUser(email, password);
    console.log('Login Response:', result);

    if (result.success) {
      console.log('Login successful');
      window.alert('Login successful!');
      IsLoggedIn.set(true); // Update the store
      goto('/');
    } else {
      console.log('Login failed');
      error = 'Invalid credentials. Please try again.';
    }

    isSubmitting = false;
  }
</script>

  <h1 class="text-center text-xl font-bold">Log In</h1>
  
  <div class="flex justify-center items-center mt-8">
    <form on:submit={handleLogin} class="w-1/3">
      <div class="form-control w-full">
        <label class="label" for="username">
          <span>Email</span>
        </label>
        <input type="text" name="email" bind:value={email} required class="input input-bordered w-full" />
      </div>
  
      <div class="form-control w-full">
        <label class="label" for="password">
          <span>Password</span>
        </label>
        <input type="password" name="password" bind:value={password} required class="input input-bordered w-full" />
      </div>
  
      {#if error}
        <p class="text-red-500">{error}</p>
      {/if}
  
      <div class="form-control w-full mt-4">
        {#if isSubmitting}
        <button class="btn btn-md">Log In</button>
        {:else}
          <button class="btn btn-md">Log In</button>
        {/if}
      </div>
    </form>
  </div>