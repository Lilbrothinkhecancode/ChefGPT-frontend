import { isValidToken } from "../utils/auth";

export const ssr = false;

export async function load(){
    await isValidToken()
}

