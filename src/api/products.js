import {api} from './client'

const BASE = "/products"

export const productsApi = {
    list : () => api.get(`${BASE}/`),
    get : (id) => api.get(`${BASE}/${id}`),
    create : (product) => api.post(`${BASE}/`, product),
    update : (id, product) => api.put(`${BASE}/${id}`, product),
    delete : (id) => api.get(`${BASE}/${id}`)
};

export const categoriesApi ={
    list : async () => {
        const data = await productsApi.list();
        const allCategories = data.map(product => product.category);
        return [...new Set(allCategories)]
    }
}