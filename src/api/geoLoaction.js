import { api, GEO_API } from "./client";

const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

const AUTOCOMPLETE_BASE = '/autocomplete';
const REVERSE_BASE = '/reverse';


export const geoLocationApi = {
    search : (text) => api.get(GEO_API, `${AUTOCOMPLETE_BASE}?text=${text}&apiKey=${API_KEY}`),

    reverseGeocode : (lat, lon) => api.get(GEO_API, `${REVERSE_BASE}?lat=${lat}&lon=${lon}&apiKey=${API_KEY}`)
}

