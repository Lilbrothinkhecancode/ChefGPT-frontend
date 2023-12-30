<script>
  import { goto } from '$app/navigation';
  import {authenticateUser} from '../../../utils/auth';
  
  
  function postSignIn() {
      goto('../');
    }
  
  
    let error = '';
   
  
    async function handleLogin(evt) {
   
      evt.preventDefault();
  
      const userData = {
        email: evt.target['email'].value,
        password: evt.target['password'].value,
      };
  
  
      const response = await authenticateUser(userData.email, userData.password)
  
  
      if (response.success) {
        postSignIn();
      } else {
        throw 'Login Failed';
      }
  
    }
  </script>
  
  <div class="text-center">
    <h1 class="text-center text-xl font-bold">Log In</h1>
    <a class="link-hover italic text-xs" href="/users/new"
    >Don't have an account? Sign Up Here!</a
  >
    
  </div>

   
    
    <div class="flex justify-center items-center mt-8">
      <form on:submit={handleLogin} class="w-1/3">
        <div class="form-control w-full">
          <label class="label" for="username">
            <span>Email</span>
          </label>
          <input type="text" name="email" required class="input input-bordered w-full" />
        </div>
    
        <div class="form-control w-full">
          <label class="label" for="password">
            <span>Password</span>
          </label>
          <input type="password" name="password" required class="input input-bordered w-full" />
        </div>
    
        {#if error}
          <p class="text-red-500">{error}</p>
        {/if}
    
        <div class="form-control w-full mt-4">
  
          <button class="btn btn-md">Log In</button>  
        </div>
      </form>
    </div>