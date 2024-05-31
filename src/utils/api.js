import {BASE_URL} from "./config";

class Api {
    constructor() {
        this._baseUrl = BASE_URL;
    }

    register(userData) {
        return fetch(`${this._baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(userData)
        })
    }

    login(creds) {
        return fetch(`${this._baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(creds)
        })
    }

    requestEmailVerify(email) {
        return fetch(`${this._baseUrl}/password-reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({email})
        })
    }

    postNewPassword(userInfo) {
        return fetch(`${this._baseUrl}/password-reset/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(userInfo)
        })
    }

    getData() {
        return fetch(`${this._baseUrl}/ingredients`, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        });
    }

    createOrder(order) {
        return fetch(`${this._baseUrl}/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(order)
        })
    }
}

const api = new Api(BASE_URL);
export default api;