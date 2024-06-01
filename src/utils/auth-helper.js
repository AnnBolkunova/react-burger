import {BASE_URL} from "./config";
import {checkResponse} from "./check-response";

const refreshToken = async () => {
    return await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
};

export const fetchWithRefresh = async (url, options) => {
    const data = await fetch(url, options)
        .then(checkResponse);

    if (data.message === "jwt expired") {
        const newData = await refreshToken()
            .then(checkResponse);

        if (!newData.success) {
            return newData;
        }

        localStorage.setItem("accessToken", newData.accessToken);
        localStorage.setItem("refreshToken", newData.refreshToken);
        options.headers.Authorization = newData.accessToken;

        const res = await fetch(url, options);

        return res.json();
    } else {
        return data;
    }
};