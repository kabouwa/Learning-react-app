const Ip = ['127.0.0.1','192.168.1.26'][0];
const Port = '8000';

export const COFFEE_SHOP_API = `http://${Ip}:${Port}/api/v1`;

export const GEO_API = `https://api.geoapify.com/v1/geocode`;

export const WEATHER_API = `https://api.open-meteo.com/v1/`;

export const api = {
    get    : (server_url, path)      => request(server_url, path , {method: "GET"}),
    post   : (server_url, path, data) => request(server_url, path , {method: "POST", body: JSON.stringify(data)}),
    put    : (server_url, path, data) => request(server_url, path , {method: "PUT", body: JSON.stringify(data)}),
    patch  : (server_url, path, data) => request(server_url, path , {method: "PATCH", body: JSON.stringify(data)}),
    delete : (server_url, path)      => request(server_url, path , {method: "DELETE"}),
}


async function request(server_url, path, options={}) {
    const url = `${server_url}${path[0] != '/' ? '/' : ''}${path}`;    
    
    // Disable on local server request (starting with http://)
    const offlineMode = !server_url.startsWith('http://');

    const config = {
        ...options,
        headers : {
            "Content-Type" : "application/json",
            ...options.headers
        },
    }

    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (offlineMode && !navigator.onLine) {
        throw new ApiError(
            "You're offline. Check your internet connection.",
            0,
            null
        );
    }

    let response;
    try{
        response = await fetch(url, config);
    } catch {
        throw new ApiError(
            "Unable to connect to the local server.",
        0,
            null
        )
    }

    let body = null;
    try{
        body = await response.json();
    } catch (error) {
        error
    }
    
    // if(!response.ok) {        
    //     throw new ApiError(
    //         body?.errors || "Unable to attribute connection with server.",
    //         response.status,
    //         body
    //     );
    // }

    const randomDelay = 100 + Math.floor( Math.random() * 200 )
    await new Promise(resolve => setTimeout(resolve, randomDelay));

    return body;
}

export class ApiError extends Error {
    constructor(message, status, body) {
        super(message)
        this.name = "ApiError"
        this.status = status
        this.body = body
    }
}