import {BASE_URL} from "./config";
import {TCredentials, TResetPasswordArgs, TUser} from "./types";

class Api {
    private _baseUrl: string;

    constructor(BASE_URL: string) {
        this._baseUrl = BASE_URL;
    }

    register(userData: TUser) {
        return fetch(`${this._baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(userData)
        })
    }

    login(creds: TCredentials) {
        return fetch(`${this._baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(creds)
        })
    }

    requestEmailVerify(email: string) {
        return fetch(`${this._baseUrl}/password-reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({email})
        })
    }

    postNewPassword(userInfo: TResetPasswordArgs) {
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

    fetchOrderInfo(id: number) {
        return fetch(`${BASE_URL}/orders/${id}`, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        })
    }
}

const api = new Api(BASE_URL);
export default api;