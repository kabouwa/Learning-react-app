import { api, GEO_API } from "./client";

const BASE = '/autocomplete';
const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;


export const geoAutoCompleteApi = {
    search : (text) => api.get(GEO_API, `${BASE}?text=${text}&apiKey=${API_KEY}`)
}

