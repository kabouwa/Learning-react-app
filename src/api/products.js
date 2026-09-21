import {api} from './client'

const BASE = "/products"

export const productsApi = {
    list : async(page = 1) => {
        const response = await api.get(`${BASE}/?page=${page}`)
        return response;
    } ,

    categories : () => api.get(`${BASE}/categories`), 
    
    get : (slug) => api.get(`${BASE}/${slug}`),
    
    create : (product) => api.post(`${BASE}/`, product),
    
    update : (slug, product) => api.put(`${BASE}/${slug}`, product),
    
    delete : (slug) => api.delete(`${BASE}/${slug}`)
};