import {configureStore} from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredientsSlice";
import constructorReducer from "./slices/constructorSlice";
import ingredientDetailsReducer from "./slices/ingredientDetailsSlice";
import orderSliceReducer from "./slices/orderSlice";

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        burgerConstructor: constructorReducer,
        ingredientDetails: ingredientDetailsReducer,
        orderDetails: orderSliceReducer,
    },
});