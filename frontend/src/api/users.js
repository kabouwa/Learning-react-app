import { api, server } from "./client";

const BASE = '/users';

export const usersApi = {
    list : () => api.get(`${BASE}/`),

    get : (id) => server.get(`${BASE}/${id}`),

    create : (user) => api.post(`${BASE}/`, user),

    update : (id, user) => api.put(`${BASE}/${id}`, user),

    delete : (id) => api.get(`${BASE}/${id}`),

    login : (username, password) => server.post(`/login`, {username, password})
};
