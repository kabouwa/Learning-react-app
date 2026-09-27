import { api, COFFEE_SHOP_API } from "./client";

export const dashboardApi = {
    statistics : () => api.get(COFFEE_SHOP_API, '/dashboard')
}