import { api } from "./client";

const BASE = '/auth';

export const authApi = {
    register : (user) => api.post(`${BASE}/register`, user),

    user : () => api.get(`${BASE}/user`),

    update : (user) => api.put(`${BASE}/user`, user),

    login : async (user) => {
        const response = await api.post(`${BASE}/login`, user);
        if (response?.token) localStorage.setItem('token', response.token);
        return response;
    },

    logout : async () => {
        const response = await api.post(`${BASE}/logout`);
        localStorage.removeItem('token');;
        return response;
    }
};