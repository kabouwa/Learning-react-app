import {api} from './client'

const BASE = "/products"

export const productsApi = {
    list : async(page = 1) => {
        const response = await api.get(`${BASE}/?page=${page}`)
        return response.data;
    } ,

    categories : () => api.get(`${BASE}/categories`), 
    
    get : (id) => api.get(`${BASE}/${id}`),
    
    create : (product) => api.post(`${BASE}/`, product),
    
    update : (id, product) => api.put(`${BASE}/${id}`, product),
    
    delete : (id) => api.delete(`${BASE}/${id}`)
};