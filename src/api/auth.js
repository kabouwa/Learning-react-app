import { api, COFFEE_SHOP_API } from "./client";

const BASE = '/auth';

export const authApi = {
    register : async (user) => {
        const response = await api.post(COFFEE_SHOP_API, `${BASE}/register`, user);
        if (response?.token) localStorage.setItem('token', response.token);
        return response;
    },

    user : () => api.get(COFFEE_SHOP_API, `${BASE}/user`),

    update : (user) => api.put(COFFEE_SHOP_API, `${BASE}/user`, user),

    login : async (user) => {
        const response = await api.post(COFFEE_SHOP_API, `${BASE}/login`, user);
        if (response?.token) localStorage.setItem('token', response.token);
        return response;
    },

    logout : async () => {
        const response = await api.post(COFFEE_SHOP_API, `${BASE}/logout`);
        localStorage.removeItem('token');;
        return response;
    }
};