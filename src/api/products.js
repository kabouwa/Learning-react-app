import {api, COFFEE_SHOP_API} from './client'

const BASE = "/products"

export const productsApi = {
    list : async(page = 1) => {
        const response = await api.get(COFFEE_SHOP_API, `${BASE}/?page=${page}`)
        return response;
    } ,

    categories : () => api.get(COFFEE_SHOP_API, `${BASE}/categories`), 
    
    get : (slug) => api.get(COFFEE_SHOP_API, `${BASE}/${slug}`),
    
    create : (product) => api.post(COFFEE_SHOP_API, `${BASE}/`, product),
    
    update : (slug, product) => api.put(COFFEE_SHOP_API, `${BASE}/${slug}`, product),
    
    delete : (slug) => api.delete(COFFEE_SHOP_API, `${BASE}/${slug}`)
};