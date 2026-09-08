const API_URL = "https://fakestoreapi.com";

async function request(path, options={}) {
    const url = `${API_URL}${path[0] != '/' ? '/' : ''}${path}`;

    const config = {
        headers : {
            "Content-Type" : "application/json",
            ...options.headers
        },
        ...options
    }

    let response;
    try{
        response = await fetch(url, config);
    } catch (networkError) {
        networkError
        throw new ApiError(
            "Unable to attribute connection with server.",
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
            body?.message || `Erreur ${response.status}`,
            response.status,
            body
        );
    }

    const randomDelay = 250 + Math.floor( Math.random() * 350 )
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