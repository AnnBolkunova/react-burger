import {createSlice} from "@reduxjs/toolkit";

const constructorSlice = createSlice({
    name: "burgerConstructor",
    initialState: {
        bun: null,
        ingredients: []
    },
    reducers: {
        setBun: (state, action) => {
            state.bun = action.payload;
        },
        addIngredient: (state, action) => {
            state.ingredients.push(action.payload);
        },
        removeIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(
                (item) => item.key !== action.payload.key
            );
        },
        moveIngredient: (state, action) => {
            state.ingredients.splice(
                action.payload.toIndex,
                0,
                state.ingredients.splice(action.payload.fromIndex, 1)[0]
            );
        },
    },
});

export const {
    setBun,
    addIngredient,
    removeIngredient,
    moveIngredient
} = constructorSlice.actions;

export default constructorSlice.reducer;