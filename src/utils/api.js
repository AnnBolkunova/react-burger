import apiConfig from "./config";

class Api {
    constructor(apiConfig) {
        this._baseUrl = apiConfig.baseUrl;
        // this._headers = apiConfig.headers;
    }

    async getData() {
        const res = await fetch(`${this._baseUrl}`, {});
        return this._handleResponse(res);
    }

    _handleResponse = (res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const api = new Api(apiConfig);
export default api;