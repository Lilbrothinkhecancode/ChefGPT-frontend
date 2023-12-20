
import { PUBLIC_SPOON_API_KEY } from '$env/static/public';


export async function load({ fetch, params }) {

  
    const resp = await fetch(`https://api.spoonacular.com/recipes/${params.slug}/information?apiKey=${PUBLIC_SPOON_API_KEY}`);
      
    const res = await resp.json();
    if (resp.status == 200) {
      return {
        recipe: res
      }
    } else {
      return {
        recipe: []
      }
    }
  }