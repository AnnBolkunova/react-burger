import apiConfig from "./config";

class Api {
    constructor(apiConfig) {
        this._baseUrl = apiConfig.baseUrl;
        // this._headers = apiConfig.headers;
    }

    getData() {
        return fetch(`${this._baseUrl}/ingredients`, {
            // headers: this._headers
        });
    }

    createOrder(order) {
        return fetch(`${this._baseUrl}/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order)
        })
    }
}

const api = new Api(apiConfig);
export default api;