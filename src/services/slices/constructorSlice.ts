import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TDragIngredientParams, TIngredient} from "../../utils/types";

type TConstructorSliceState = {
    bun: TIngredient | null;
    ingredients: Array<TIngredient>;
};

export const initialState: TConstructorSliceState = {
    bun: null,
    ingredients: [],
};

const constructorSlice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        setBun: (state, action: PayloadAction<TIngredient>) => {
            state.bun = action.payload;
        },
        addIngredient: (state, action: PayloadAction<TIngredient>) => {
            state.ingredients.push(action.payload);
        },
        removeIngredient: (state, action: PayloadAction<TIngredient>) => {
            state.ingredients = state.ingredients.filter(
                (item) => item.key !== action.payload.key
            );
        },
        moveIngredient: (state, action: PayloadAction<TDragIngredientParams>) => {
            state.ingredients.splice(
                action.payload.toIndex,
                0,
                state.ingredients.splice(action.payload.fromIndex, 1)[0]
            );
        },
        clearConstructor: (state) => {
            state.bun = null;
            state.ingredients = [];
        }
    },
});

export const {
    setBun,
    addIngredient,
    removeIngredient,
    moveIngredient,
    clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;