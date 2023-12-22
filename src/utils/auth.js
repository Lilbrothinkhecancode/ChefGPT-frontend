import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { IsLoggedIn } from './stores.js';





const emptyAuth = {
	"token": "",
	"userId": ""
  }

export function logOut() {
	localStorage.setItem('auth', JSON.stringify(emptyAuth));
	IsLoggedIn.set(false);
	goto('users/sign-in/');
	return true;
}

export function getUserId() {
	const auth = localStorage.getItem("auth")
	if (auth) {
	  return JSON.parse(auth)["userId"]
	}
	return null
  }

export function getTokenFromLocalStorage() {
	const auth = localStorage.getItem('auth');
	if (auth) {
		return JSON.parse(auth)['token'];
	}
	return null;
}

export async function isValidToken() {
  if (!getTokenFromLocalStorage()) {
    return false
  }

  try {
    const token = getTokenFromLocalStorage();
    const resp = await fetch(
      PUBLIC_BACKEND_BASE_URL + '/users/login/authenticate',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      }
    );

    if (resp.status == 200) {

      IsLoggedIn.set(true)
      return true
    }

    return false
  } catch {
    return false
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
		IsLoggedIn.set(true)
	
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