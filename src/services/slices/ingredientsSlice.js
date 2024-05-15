import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../utils/api";
import {checkResponse} from "../../utils/check-response";

export const fetchIngredients = createAsyncThunk(
    "ingredients/fetchDataThunk",
    async () => {
        const res = await api.getData()
            .then(checkResponse);
        const {data} = res;

        return data;
    }
);

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState: {
        ingredients: [],
        currentTab: "bun",
        status: null,
        error: null
    },
    reducers: {
        switchTab: (state, action) => {
            state.currentTab = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.ingredients = action.payload;
                state.error = null;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            });
    },
});

export const {switchTab} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;