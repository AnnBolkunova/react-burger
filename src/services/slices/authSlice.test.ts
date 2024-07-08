import authReducer, {
    registerThunk,
    loginThunk,
    logoutThunk,
    getUserThunk,
    updateUserThunk,
    emailVerifyThunk,
    setNewPasswordThunk,
    clearPasswordReset,
} from "./authSlice";
import {TAuthResult, TUser} from "../../utils/types";
import authSlice, {initialState} from "./authSlice";

describe("authSlice", () => {
    it("should return the initial state", () => {
        expect(authReducer(undefined, {type: ""})).toEqual(initialState);
    });

    it("should handle pending register", () => {
        const state = {
            ...initialState,
            hasError: true,
            user: {name: "Boris", email: "boris@yandex.ru"},
        };

        const action = {type: registerThunk.pending.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it("should handle successful register", () => {
        const authResult: TAuthResult = {
            user: {
                name: "Petya",
                password: "9999",
                email: "yyy@yandex.ru",
            },
            accessToken: "accessToken",
            refreshToken: "refreshToken",
        };

        const state = {
            ...initialState,
            isLoading: true,
            hasError: true,
            isLoggedOut: true,
        };

        const action = {type: registerThunk.fulfilled.type, payload: authResult};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            isLoggedIn: true,
            user: authResult.user,
            accessToken: authResult.accessToken,
            refreshToken: authResult.refreshToken,
        });
    });

    it("should handle failed register", () => {
        const state = {
            ...initialState,
            isLoading: true,
            user: {name: "Valya", email: "valya@yandex.ru"},
        };

        const action = {type: registerThunk.rejected.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            hasError: true,
        });
    });

    it("should handle pending login", () => {
        const state = {
            ...initialState,
            hasError: true,
            isLoggedIn: true,
            user: {
                name: "Sveta",
                email: "sveta@yandex.ru",
            },
        };

        const action = {type: loginThunk.pending.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it("should handle successful login", () => {
        const authResult: TAuthResult = {
            user: {
                name: "Vasya",
                password: "8888",
                email: "xxx@yandex.ru",
            },
            accessToken: "accessToken",
            refreshToken: "refreshToken",
        };

        const state = {
            ...initialState,
            isLoading: true,
            hasError: true,
            isLoggedOut: true,
        };

        const action = {type: loginThunk.fulfilled.type, payload: authResult};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            user: authResult.user,
            accessToken: authResult.accessToken,
            refreshToken: authResult.refreshToken,
            isLoggedIn: true,
        });
    });

    it("should handle failed login", () => {
        const state = {
            ...initialState,
            isLoading: true,
            user: {name: "Katya", email: "katya@yandex.ru"},
            isLoggedIn: true,
        };

        const action = {type: loginThunk.rejected.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            hasError: true,
        });
    });

    it("should handle pending logout", () => {
        const state = {
            ...initialState,
            hasError: true,
            isLoggedOut: true,
        };

        const action = {type: logoutThunk.pending.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it("should handle successful logout", () => {
        const state = {
            ...initialState,
            isLoading: true,
            hasError: true,
            isLoggedIn: true,
            accessToken: "accessToken",
            refreshToken: "accessToken",
            user: {name: "Dima", email: "dima@yandex.ru"},
        };

        const action = {type: logoutThunk.fulfilled.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            isLoggedOut: true,
            accessToken: "",
            refreshToken: "",
        });
        expect(localStorage.removeItem).toHaveBeenCalledWith("accessToken");
        expect(localStorage.removeItem).toHaveBeenCalledWith("refreshToken");
    });

    it("should handle failed logout", () => {
        const state = {
            ...initialState,
            isLoading: true,
            isLoggedOut: true,
        };

        const action = {type: logoutThunk.rejected.type};
        const result = authSlice(state, action);

        expect(result).toEqual({
            ...initialState,
            hasError: true,
        });
    });

    it("should handle pending get user", () => {
        const state = {
            ...initialState,
            hasError: true,
        };

        const action = {type: getUserThunk.pending.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it("should handle pending get user", () => {
        const state = {
            ...initialState,
            isLoading: true,
            hasError: true,
        };

        const user: TUser = {
            name: "Kolya",
            password: "admin",
            email: "kolya@yandex.ru",
        };

        const action = {type: getUserThunk.fulfilled.type, payload: user};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            user,
        });
    });

    it("should handle failed get user", () => {
        const state = {
            ...initialState,
            isLoading: true,
        };

        const action = {type: getUserThunk.rejected.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            hasError: true,
        });
    });

    it("should handle pending update user", () => {
        const state = {
            ...initialState,
            hasError: true,
        };

        const action = {type: updateUserThunk.pending.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it("should handle pending update user", () => {
        const state = {
            ...initialState,
            isLoading: true,
            hasError: true,
        };

        const user: TUser = {
            name: "Sergey",
            password: "mix",
            email: "serga@yandex.ru",
        };

        const action = {type: updateUserThunk.fulfilled.type, payload: user};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            user,
        });
    });

    it("should handle failed update user", () => {
        const state = {
            ...initialState,
            isLoading: true,
        };

        const action = {type: updateUserThunk.rejected.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            hasError: true,
        });
    });

    it("should handle pending check reset password", () => {
        const state = {
            ...initialState,
            hasError: true,
            isResetPassword: true,
        };

        const action = {type: emailVerifyThunk.pending.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it("should handle successful check reset password", () => {
        const state = {
            ...initialState,
            isLoading: true,
            hasError: true,
        };

        const action = {type: emailVerifyThunk.fulfilled.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            isResetPassword: true,
        });
    });

    it("should handle failed check reset password", () => {
        const state = {
            ...initialState,
            isLoading: true,
            isResetPassword: true,
        };

        const action = {type: emailVerifyThunk.rejected.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            hasError: true,
        });
    });

    it("should handle pending reset password", () => {
        const state = {
            ...initialState,
            hasError: true,
            isPasswordWasReset: true,
        };

        const action = {type: setNewPasswordThunk.pending.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            isLoading: true,
            isResetPassword: true,
        });
    });

    it("should handle successful reset password", () => {
        const state = {
            ...initialState,
            isLoading: true,
            hasError: true,
            isResetPassword: true,
        };

        const action = {type: setNewPasswordThunk.fulfilled.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            isPasswordWasReset: true,
        });
    });

    it("should handle failed reset password", () => {
        const state = {
            ...initialState,
            isLoading: true,
            isPasswordWasReset: true,
        };

        const action = {type: setNewPasswordThunk.rejected.type};
        const result = authReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            hasError: true,
            isResetPassword: true,
        });
    });

    it("should handle 'clearPasswordReset'", () => {
        const state = {...initialState, isPasswordWasReset: true};
        const result = authReducer(state, clearPasswordReset());
        expect(result).toEqual(initialState);
    });
});