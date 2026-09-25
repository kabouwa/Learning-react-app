import { api } from "./client";

export const dashboardApi = {
    statistics : () => api.get('/dashboard')
}