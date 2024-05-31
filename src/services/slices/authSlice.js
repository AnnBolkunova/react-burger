import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../utils/api";
import {BASE_URL} from "../../utils/config";
import {fetchWithRefresh} from "../../utils/auth-helper";

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (userData) => {
        const res = await api.register(userData)
        const data = await res.json();

        if (data.success) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            return {
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            };
        }
    }
);

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (creds) => {
        const res = await api.login(creds)
        const data = await res.json();

        if (data.success) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            return {
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            };
        }
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, {rejectWithValue}) => {
        const data = await fetchWithRefresh(`${BASE_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        });

        if (data.success) {
            return {};
        } else {
            return rejectWithValue("");
        }
    }
);

export const getUserThunk = createAsyncThunk(
    "auth/getUser",
    async (_, {rejectWithValue}) => {
        const data = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: localStorage.getItem("accessToken"),
            },
        });

        if (data.success) {
            return {user: data.user};
        } else {
            return rejectWithValue("");
        }
    }
);

export const updateUserThunk = createAsyncThunk(
    "auth/updateUser",
    async (userInfo, {rejectWithValue}) => {
        const data = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(userInfo),
        });

        if (data.success) {
            return {user: data.user};
        } else {
            return rejectWithValue("");
        }
    }
);

export const emailVerifyThunk = createAsyncThunk(
    "auth/emailVerify",
    async (email, {rejectWithValue}) => {
        const res = await api.requestEmailVerify(email);

        const data = await res.json();

        if (data.success) {
            return {};
        } else {
            return rejectWithValue("");
        }
    }
);

export const setNewPasswordThunk = createAsyncThunk(
    "auth/setNewPassword",
    async (userInfo, {rejectWithValue}) => {
        const res = await api.postNewPassword(userInfo);

        const data = await res.json();

        if (data.success) {
            return {};
        } else {
            return rejectWithValue("");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
        user: null,
        isResetPassword: false,
        isPasswordWasReset: false,
        isLoading: false,
        hasError: false,
        isShown: false,
        isLoggedIn: false,
        isFetchedUser: false,
        isLoggedOut: false,
    },
    reducers: {
        clearPasswordReset: (state) => {
            state.isPasswordWasReset = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.user = null;
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.user = action.payload.user;
                state.isLoggedIn = true;
                state.isLoggedOut = false;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(registerThunk.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
                state.user = null;
            })
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isLoggedIn = true;
                state.isLoggedOut = false;
            })
            .addCase(loginThunk.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(logoutThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.isLoggedOut = false;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.hasError = false;
                state.isLoggedOut = true;
                state.isLoggedIn = false;
                state.accessToken = "";
                state.refreshToken = "";
                state.user = null;
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            })
            .addCase(logoutThunk.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
                state.isLoggedOut = false;
            })
            .addCase(getUserThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(getUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.user = action.payload.user;
            })
            .addCase(getUserThunk.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(updateUserThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.user = action.payload.user;
            })
            .addCase(updateUserThunk.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(emailVerifyThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.isResetPassword = false;
            })
            .addCase(emailVerifyThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.hasError = false;
                state.isResetPassword = true;
            })
            .addCase(emailVerifyThunk.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
                state.isResetPassword = false;
            })
            .addCase(setNewPasswordThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
                state.isResetPassword = true;
                state.isPasswordWasReset = false;
            })
            .addCase(setNewPasswordThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.hasError = false;
                state.isResetPassword = false;
                state.isPasswordWasReset = true;
            })
            .addCase(setNewPasswordThunk.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
                state.isResetPassword = true;
                state.isPasswordWasReset = false;
            })
    },
});

export const {clearPasswordReset} = authSlice.actions;

export default authSlice.reducer;