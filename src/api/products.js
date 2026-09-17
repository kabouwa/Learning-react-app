import {api} from './client'

const BASE = "/products"

export const productsApi = {
    list : (page = 1) => api.get(`${BASE}/?page=${page}`),

    categories : () => api.get(`${BASE}/categories`), 
    
    get : (id) => api.get(`${BASE}/${id}`),
    
    create : (product) => api.post(`${BASE}/`, product),
    
    update : (id, product) => api.put(`${BASE}/${id}`, product),
    
    delete : (id) => api.delete(`${BASE}/${id}`)
};