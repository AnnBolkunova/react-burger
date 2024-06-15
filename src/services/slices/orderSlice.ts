import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import api from "../../utils/api";
import {checkResponse} from "../../utils/check-response";
import {TCreatedOrder, TOrder} from "../../utils/types";
import {ThunkAPI} from "../store";

export const createOrderThunk = createAsyncThunk<TCreatedOrder, TOrder, ThunkAPI>(
    "order/createOrderThunk",
    async (order, thunkAPI) => {
        const res = await api.createOrder(order)
            .then(checkResponse);

        if (res.success) {
            return {name: res.name, number: res.order.number} as TCreatedOrder;
        } else {
            return thunkAPI.rejectWithValue("");
        }
    }
);

type TOrderSliceState = {
    name: string;
    number: number;
    isOpen: boolean;
    isLoading: boolean;
    hasError: boolean;
};

const initialState: TOrderSliceState = {
    name: "",
    number: 0,
    isOpen: false,
    isLoading: false,
    hasError: false,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        showOrderDetails: (state) => {
            state.isOpen = true;
        },
        closeOrderDetails: (state) => {
            state.name = "";
            state.number = 0;
            state.isOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(createOrderThunk.fulfilled, (state, action: PayloadAction<TCreatedOrder>) => {
                state.name = action.payload.name;
                state.number = action.payload.number;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(createOrderThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
            });
    },
});

export const {
    showOrderDetails,
    closeOrderDetails
} = orderSlice.actions;

export default orderSlice.reducer;