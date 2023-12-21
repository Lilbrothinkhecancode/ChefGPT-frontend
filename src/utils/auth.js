import { IsLoggedIn } from '../utils/stores.js';


  "token": "",
  "userId": ""
}

// Function to handle successful authentication
function handleSuccessfulAuthentication() {
  IsLoggedIn.set(true);
  // You can add any additional logic here after successful authentication
}


export function logOut() {
  localStorage.setItem("auth", JSON.stringify(emptyAuth));
  IsLoggedIn.set(false);
  return true;
}

export function getUserId() {

  const auth = localStorage.getItem("auth")
  if (auth) {
    return JSON.parse(auth)["userId"]
  }
  return null;
}


export function getTokenFromLocalStorage() {
  const auth = localStorage.getItem("auth");
  console.log('Token from localStorage:', auth);
  
  if (auth) {
    return JSON.parse(auth)["token"];
  }
  
  return null;
}

export async function isLoggedIn() {
  const token = getTokenFromLocalStorage();
  console.log('Token in isLoggedIn:', token);
  if (!token) {
    IsLoggedIn.set(false);
    console.log('User is not logged in');
    return false;
  }

  const baseUrl = import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL;
  const url = new URL('/auth-refresh', baseUrl);
  
  console.log('Fetch URL:', url);

  try {
    const resp = await fetch(
      url,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
    );

    console.log('Response status:', resp.status);

    if (resp.status == 200) {
      IsLoggedIn.set(true);
      return true;
    }

    IsLoggedIn.set(false);
    return false;
  } catch (error) {
    console.error('Error in isLoggedIn:', error);
    IsLoggedIn.set(false);
    return false;
  }
}

export async function authenticateUser(email, password) {

	const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/users/login', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email,
			password: password
		})
	});

	const res = await resp.json();


	if (resp.status == 200) {
		localStorage.setItem("auth", JSON.stringify({
		  "token": res.result.token,
		  "userId": res.result.Id
		}));
		isLoggedIn.set(true)
	
		return {
		  success: true,
		  res: res
		}
	  }
	
	  return {
		success: false,
		res: res
	  }

}