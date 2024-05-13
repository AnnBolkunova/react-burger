import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiConfig from "../../utils/config";
import api from "../../utils/api";

export const fetchIngredients = createAsyncThunk(
    "ingredients/fetchDataThunk",
    async (_, {rejectWithValue}) => {
        try {
            const res = await api.getData();

            if (!res.ok) {
                return Promise.reject(`Server error: ${res.status}`);
            }

            const json = await res.json();
            return json.data;

        } catch (error) {
            return rejectWithValue(error.message);
        }
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