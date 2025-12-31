'use server'

import axios from "axios";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(username: string, password: string) {
    let redirectPath: string | null = null;
    try {
        const response = await axios.post(`${process.env.BACKEND_BASE_URL}/login`, 
            { username, password });
        console.log("login response data:", response.data);
        const cookieStore = await cookies();
        cookieStore.set("access", response.data.access);
        cookieStore.set("refresh", response.data.refresh);
        cookieStore.set("user", username); 
        redirectPath = '/match-analysis';
    } catch (error: any) {
        console.log("login error:", error);
        console.log("error.response.data.message:", error.response.data.message);
        return { error: error.response.data.message };
    } finally {
        if (redirectPath) {
            redirect(redirectPath);
        }
    }
}

export async function logout() {
    
    const cookieStore = await cookies();

    let redirectPath: string | null = null;
    try {
        await axios.post(`${process.env.BACKEND_BASE_URL}/logout`, 
        { refresh: cookieStore.get("refresh").value });
        cookieStore.delete("access");
        cookieStore.delete("refresh");
        cookieStore.delete("user");
        redirectPath = '/login';
    } catch (error: any) {
        return { error: error.message };
    } finally {
        if (redirectPath) {
            redirect(redirectPath);
        }
    }
}

export async function signup(username: string, email: string, password: string) {
    let redirectPath: string | null = null;
    try {
        const response = await axios.post(`${process.env.BACKEND_BASE_URL}/signup`, 
            { username, email, password });
        console.log("signup response data:", response.data);

        redirectPath = '/login';
    } catch (error: any) {
        console.log("signup error:", error);
        console.log("signup.response.data.message:", error.response.data.message);
        return { error: error.response.data.message };
    } finally {
        if (redirectPath) {
            redirect(redirectPath);
        }
    }
}

