import {createSlice} from "@reduxjs/toolkit";

const ingredientDetailsSlice = createSlice({
    name: "ingredientDetails",
    initialState: {
        isOpen: false,
        ingredient: {}
    },
    reducers: {
        showDetails: (state, action) => {
            state.ingredient = action.payload;
            state.isOpen = true;
        },
        closeDetails: (state) => {
            state.ingredient = {};
            state.isOpen = false;
        },
    },
});

export const {
    showDetails,
    closeDetails
} = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;