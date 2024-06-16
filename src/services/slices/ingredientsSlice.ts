import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import api from "../../utils/api";
import {checkResponse} from "../../utils/check-response";
import {TIngredient} from "../../utils/types";

export const fetchIngredients = createAsyncThunk<Array<TIngredient>>(
    "ingredients/fetchDataThunk",
    async () => {
        const res = await api.getData()
            .then(checkResponse);
        const {data} = res;

        return data as Array<TIngredient>;
    }
);

type TIngredientsSliceState = {
    ingredients: Array<TIngredient>;
    currentTab: string;
    isLoading: boolean;
    hasError: boolean;
};

const initialState: TIngredientsSliceState = {
    ingredients: [],
    currentTab: "bun",
    isLoading: false,
    hasError: false,
};

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        switchTab: (state, action: PayloadAction<string>) => {
            state.currentTab = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<Array<TIngredient>>) => {
                state.ingredients = action.payload;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
            });
    },
});

export const {switchTab} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;