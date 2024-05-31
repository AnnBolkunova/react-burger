import {configureStore} from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredientsSlice";
import constructorReducer from "./slices/constructorSlice";
import orderSliceReducer from "./slices/orderSlice";
import authSliceReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        burgerConstructor: constructorReducer,
        orderDetails: orderSliceReducer,
        auth: authSliceReducer,
    },
});