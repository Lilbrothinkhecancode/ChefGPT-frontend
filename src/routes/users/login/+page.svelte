<script>
  let email = '';
  let password = '';
  let error = '';
  let isSubmitting = false;

  async function handleLogin(evt) {
    isSubmitting = true;
    evt.preventDefault();

    const userData = {
      email: evt.target['email'].value,
      password: evt.target['password'].value,
    };

    const baseUrl = import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL;
    const loginUrl = new URL('/auth', baseUrl);

    const response = await fetch(loginUrl.href, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    console.log('Response status:', response.status);

    const result = await response.json();

    console.log('Response body:', result);

    if (result.result && result.result.token && result.result.Id) {
  console.log('Login successful');
  window.alert('Login successful!');
  window.location.href = '/';
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