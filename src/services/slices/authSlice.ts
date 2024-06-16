import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import api from "../../utils/api";
import {BASE_URL} from "../../utils/config";
import {fetchWithRefresh} from "../../utils/auth-helper";
import {checkResponse} from "../../utils/check-response";
import {
    TCredentials,
    TAuthResult,
    TUser,
    TResetPasswordArgs,
} from "../../utils/types";
import {ThunkAPI} from "../store";

export const registerThunk = createAsyncThunk<TAuthResult, TUser, ThunkAPI>(
    "auth/register",
    async (userData, thunkAPI) => {
        const data = await api.register(userData)
            .then(checkResponse);

        if (data.success) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            return {
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            };
        } else {
            return thunkAPI.rejectWithValue("");
        }
    }
);

export const loginThunk = createAsyncThunk<TAuthResult, TCredentials, ThunkAPI>(
    "auth/login",
    async (creds, thunkAPI) => {
        const data = await api.login(creds)
            .then(checkResponse);

        if (data.success) {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            return {
                user: data.user,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            };
        } else {
            return thunkAPI.rejectWithValue("");
        }
    }
);

export const logoutThunk = createAsyncThunk<void, void, ThunkAPI>(
    "auth/logout",
    async (_, thunkAPI) => {
        const data = await fetchWithRefresh(`${BASE_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: localStorage.getItem("accessToken"),
            } as HeadersInit,
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        });

        if (data.success) {
            return;
        } else {
            return thunkAPI.rejectWithValue("");
        }
    }
);

export const getUserThunk = createAsyncThunk<TUser, void, ThunkAPI>(
    "auth/getUser",
    async (_, thunkAPI) => {
        const data = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: localStorage.getItem("accessToken"),
            } as HeadersInit,
        });

        if (data.success) {
            return data.user;
        } else {
            return thunkAPI.rejectWithValue("");
        }
    }
);

export const updateUserThunk = createAsyncThunk<TUser, TUser, ThunkAPI>(
    "auth/updateUser",
    async (userInfo, thunkAPI) => {
        const data = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: localStorage.getItem("accessToken"),
            } as HeadersInit,
            body: JSON.stringify(userInfo),
        });

        if (data.success) {
            return data.user;
        } else {
            return thunkAPI.rejectWithValue("");
        }
    }
);

export const emailVerifyThunk = createAsyncThunk<void, string, ThunkAPI>(
    "auth/emailVerify",
    async (email, thunkAPI) => {
        const data = await api.requestEmailVerify(email)
            .then(checkResponse);

        if (data.success) {
            return;
        } else {
            return thunkAPI.rejectWithValue("");
        }
    }
);

export const setNewPasswordThunk = createAsyncThunk<
    void,
    TResetPasswordArgs,
    ThunkAPI
>(
    "auth/setNewPassword",
    async (userInfo, thunkAPI) => {
        const data = await api.postNewPassword(userInfo)
            .then(checkResponse);

        if (data.success) {
            return;
        } else {
            return thunkAPI.rejectWithValue("");
        }
    }
);

type TAuthSliceState = {
    accessToken: string | null;
    refreshToken: string | null;
    user: TUser | null;
    isResetPassword: boolean;
    isPasswordWasReset: boolean;
    isLoading: boolean;
    hasError: boolean;
    isShown: boolean;
    isLoggedIn: boolean;
    isFetchedUser: boolean;
    isLoggedOut: boolean;
};

const initialState: TAuthSliceState = {
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
};

const authSlice = createSlice({
    name: "auth",
    initialState,
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
            .addCase(registerThunk.fulfilled, (state, action: PayloadAction<TAuthResult>) => {
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
            .addCase(loginThunk.fulfilled, (state, action: PayloadAction<TAuthResult>) => {
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
            .addCase(getUserThunk.fulfilled, (state, action: PayloadAction<TUser>) => {
                state.isLoading = false;
                state.hasError = false;
                state.user = action.payload;
            })
            .addCase(getUserThunk.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(updateUserThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<TUser>) => {
                state.isLoading = false;
                state.hasError = false;
                state.user = action.payload;
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