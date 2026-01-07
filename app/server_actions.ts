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
        cookieStore.set("access", response.data.access, {secure: true, httpOnly: true, sameSite: "strict"});
        cookieStore.set("refresh", response.data.refresh, {secure: true, httpOnly: true, sameSite: "strict"});
        cookieStore.set("user", username); 
        redirectPath = '/match-analysis';
    } catch (error: any) {
        console.log("login error:", error);
        console.log("login error.response.data.message:", error.response.data.message);
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
        { refresh: cookieStore.get("refresh")?.value });
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
        console.log("signup error.response.data.message:", error.response.data.message);
        return { error: error.response.data.message };
    } finally {
        if (redirectPath) {
            redirect(redirectPath);
        }
    }
}

export async function checkAuth() {
    const cookieStore = await cookies();
    if(!cookieStore.has("access")) {
        redirect('/login');
    }
}

export async function getMatchEvents(matchId: string, retry=0) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access")?.value;
    if(accessToken == null) {
        return { error: "User is not authenticated"};
    }
    
    let redirectPath: string | null = null;
    try {
        const response = await axios.get(`${process.env.BACKEND_BASE_URL}/match-events?match_id=${matchId}`, 
            { 
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        console.log("getMatchEvents response data:", response.data);
        return { data: response.data };
    } catch (error: any) {
        console.log("getMatchEvents error:", error);
        console.log("getMatchEvents error.response.data:", error.response.data);

        if (error.status == 401) {
            if (retry > 0) {
                cookieStore.delete("access");
                cookieStore.delete("refresh");
                cookieStore.delete("user");
                redirectPath = "/login"
                return { error: error.response.data.message };
            }

            console.log("Access token might need to be refreshed");

            const response = await refreshAccessToken();
            console.log("refreshAccessToken response:", response);
            if (response.error != null) {
                cookieStore.delete("access");
                cookieStore.delete("refresh");
                cookieStore.delete("user");
                redirectPath = "/login"
                return { error: response.error }
            }

            return getMatchEvents(matchId, 1);
        }

        return { error: error.response.data.message };
    } finally {
        if (redirectPath) {
            console.log(`redirect page to ${redirectPath}`)
            redirect(redirectPath);
        }
    }
}

export async function getMatchVisionGraph(matchId: string, enemySide: string, retry=0) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access")?.value;
    if(accessToken == null) {
        return { error: "User is not authenticated"};
    }
    
    let redirectPath: string | null = null;
    try {
        const response = await axios.get(`${process.env.BACKEND_BASE_URL}/match-vision-graph?match_id=${matchId}&enemy_side=${enemySide}`, 
            { 
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        console.log("getMatchVisionGraph response data:", response.data);
        return { data: response.data };
    } catch (error: any) {
        console.log("getMatchVisionGraph error:", error);
        console.log("getMatchVisionGraph error.response.data:", error.response.data);

        if (error.status == 401) {
            if (retry > 0) {
                cookieStore.delete("access");
                cookieStore.delete("refresh");
                cookieStore.delete("user");
                redirectPath = "/login"
                return { error: error.response.data.message };
            }

            console.log("Access token might need to be refreshed");

            const response = await refreshAccessToken();
            console.log("refreshAccessToken response:", response);
            if (response.error != null) {
                cookieStore.delete("access");
                cookieStore.delete("refresh");
                cookieStore.delete("user");
                redirectPath = "/login"
                return { error: response.error }
            }

            return getMatchVisionGraph(matchId, enemySide, 1);
        }

        return { error: error.response.data.message };
    } finally {
        if (redirectPath) {
            console.log(`redirect page to ${redirectPath}`)
            redirect(redirectPath);
        }
    }
}

async function refreshAccessToken() {
    console.log("refreshAccessToken!");
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh")?.value;
    if(refreshToken == null) {
        cookieStore.delete("access");
        cookieStore.delete("refresh");
        cookieStore.delete("user");
        return { error: "Missing valid tokens" };
    }

    try {
        const response = await axios.post(`${process.env.BACKEND_BASE_URL}/token-refresh`, 
            { 
                refresh: refreshToken
            }
        );

        console.log("refreshToken response.data:", response.data);
        cookieStore.set("access", response.data.access, {secure: true, httpOnly: true});
        return { message: "Refreshed access token"};
    } catch (error: any) {
        console.log("refreshToken error:", error);
        return { error: "Unable to refresh token" };
    }
}