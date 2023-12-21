<!-- <script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { authenticateUser, isLoggedIn, GetUserId } from './../../../utils/auth.js';

    let isSubmitting = false;
    let formErrors = {}; //Initialize form as empty object

    async function updateUserProfile(evt) {  // async fx  to handle user profile update
        try {
            evt.preventDefault(); //prevent default form submission to avoid page refresh
            isSubmitting = true;
    
            //create an object with user data from the form
            const userData = {
                name: evt.target['name'].value,
                email: evt.target['email'].value,
                user: GetUserId(),
            };
    
            //send a PUT request to update the user profile
            const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/users/records/' + GetUserId(), {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
    
            isSubmitting = false;
            //check response status
            if (resp.status == 200) {
                alerts.setAlert('success', 'Profile Updated!');
            } else {
                console.error('Update failed:', resp.status);
                formErrors.general = 'Update failed. Please try again.';
                alerts.setAlert('error', 'Update failed. Please try again.');
            }
        } catch(err) {
            console.error(err)
        }
    }
</script> -->

<div class="flex justify-center items-center flex-col mt-8">
    <h1 class="text-center text-xl mb-4 font-bold">Edit User Profile</h1>

    <form on:submit={updateUserProfile} class="w-1/3">
        <div class="form-control w-full">
            <label class="label" for="name">
                <span class="label-text">Name</span>
            </label>
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                class="input input-bordered w-full"
            />
        </div>

        <div class="form-control w-full">
            <label class="label" for="email">
                <span class="label-text">Email</span>
            </label>
            <input
                type="email"
                name="email"
                placeholder="Your Email"
                class="input input-bordered w-full"
            />
        </div>

        <div class="form-control w-full mt-4">
            <button class="btn btn-md">Update Profile</button>  
        </div>
    </form>
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Holy smokes!</strong>
        <span class="block sm:inline">Page is only for aesthetic purposes</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
</div>