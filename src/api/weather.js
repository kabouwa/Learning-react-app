import { api, WEATHER_API } from "./client"

const BASE = `/forecast`;

const currentParams = [
    'temperature_2m', 'relative_humidity_2m', 'wind_speed_10m', 'pressure_msl', 'precipitation', 'weather_code'
]

const hourlyParams = [
    'temperature_2m', 'weather_code'
]

const dailyParams = [
    'temperature_2m_min', 'temperature_2m_max', 'precipitation_sum', 'weather_code'
]

export const weatherApi = {
    current : (lat, lon) => 
        api.get(WEATHER_API, `${BASE}?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset&current=${currentParams.join(',')}`),

    hourly : (lat, lon) => 
        api.get(WEATHER_API, `${BASE}?latitude=${lat}&longitude=${lon}&hourly=${hourlyParams.join(',')}`),

    daily : (lat, lon) => 
        api.get(WEATHER_API, `${BASE}?latitude=${lat}&longitude=${lon}&daily=${dailyParams.join(',')}`),
}