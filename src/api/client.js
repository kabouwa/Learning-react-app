const Ip = ['127.0.0.1','192.168.1.26'][0];
const Port = '8000';
const API_SERVER = `http://${Ip}:${Port}/api/v1`;

async function request(path, options={}, offlineMode = false) {
    const url = `${API_SERVER}${path[0] != '/' ? '/' : ''}${path}`;    

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

export const api = {
    get : (path) => request(path , {method: "GET"}),
    post : (path,data) => request(path , {method: "POST", body: JSON.stringify(data)}),
    put : (path,data) => request(path , {method: "PUT", body: JSON.stringify(data)}),
    patch : (path,data) => request(path , {method: "PATCH", body: JSON.stringify(data)}),
    delete : (path) => request(path , {method: "DELETE"}),
}