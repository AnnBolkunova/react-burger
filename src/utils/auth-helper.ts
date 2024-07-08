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

export const fetchWithRefresh = async (
    url: string,
    options: RequestInit | undefined
) => {
    const res = await fetch(url, options);

    if (res.ok) {
        return await res.json();
    }

    const data = await res.json();

    if (data.message === "jwt expired") {
        const newData = await refreshToken()
        const data = await newData.json();

        if (!data.success) {
            return data;
        }

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        let opts = options || {method: "GET", headers: {}};

        opts.headers = {...opts.headers, Authorization: data.accessToken};

        const res = await fetch(url, opts);

        return res.json();
    } else {
        return data;
    }
};