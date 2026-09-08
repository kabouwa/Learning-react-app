import { api } from "./client";

const BASE = '/users';

export const usersApi = {
    list : () => api.get(`${BASE}/`),

    get : (id) => api.get(`${BASE}/${id}`),

    create : (user) => api.post(`${BASE}/`, user),

    update : (id, user) => api.put(`${BASE}/${id}`, user),

    delete : (id) => api.get(`${BASE}/${id}`),

    login : async function (username, password) { 
        const users = await this.list()
        return users.find(
            user => 
                user.username === username
                && user.password === password
        );
    }
};
