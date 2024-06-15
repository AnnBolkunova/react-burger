import {configureStore} from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredientsSlice";
import constructorReducer from "./slices/constructorSlice";
import orderSliceReducer from "./slices/orderSlice";
import authSliceReducer from "./slices/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        burgerConstructor: constructorReducer,
        orderDetails: orderSliceReducer,
        auth: authSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type ThunkAPI = {
    dispatch: AppDispatch;
};