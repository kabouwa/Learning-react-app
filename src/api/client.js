const API_URL = "https://fakestoreapi.com";
const LOCAL_SERVER = "http://localhost:5000/learning-app/api";

async function request(path, options={}, server=false) {
    const url = `${server ? LOCAL_SERVER : API_URL }${path[0] != '/' ? '/' : ''}${path}`;

    const config = {
        headers : {
            "Content-Type" : "application/json",
            ...options.headers
        },
        ...options
    }

    if (!navigator.onLine) {
        throw new ApiError(
            "You're offline. Check your internet connection.",
            0,
            null
        );
    }

    let response;
    try{
        response = await fetch(url, config);
    } catch (networkError) {
        networkError
        throw new ApiError(
            server
            ? "Unable to connect to the local server."
            : "Unable to connect to the API server.",
        0,
            null
        )
    }

    let body = null;
    try{
        body = await response.json()
    } catch (error) {
        error
    }

    if(!response.ok) {        
        throw new ApiError(
            body?.message || "Unable to attribute connection with server.",
            response.status,
            body
        );
    }

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

export const server = {
    get : (path) => request(path , {method: "GET"}, true),
    post : (path,data) => request(path , {method: "POST", body: JSON.stringify(data)}, true),
    put : (path,data) => request(path , {method: "PUT", body: JSON.stringify(data)}, true),
    patch : (path,data) => request(path , {method: "PATCH", body: JSON.stringify(data)}, true),
    delete : (path) => request(path , {method: "DELETE"}, true),
}