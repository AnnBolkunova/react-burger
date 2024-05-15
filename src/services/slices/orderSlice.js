import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../utils/api";
import {checkResponse} from "../../utils/check-response";

export const createOrderThunk = createAsyncThunk(
    "order/createOrderThunk",
    async (order, {dispatch}) => {
        const res = await api.createOrder(order)
            .then(checkResponse);

        dispatch(addNewOrder(res));
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState: {
        name: "",
        number: 0,
        isOpen: false,
        status: null,
        error: null
    },
    reducers: {
        addNewOrder: (state, action) => {
            state.name = action.payload.name;
            state.number = action.payload.order.number;
        },
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
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createOrderThunk.fulfilled, (state) => {
                state.status = 'resolved';
                state.error = null;
            })
            .addCase(createOrderThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            });
    },
});

export const {
    addNewOrder,
    showOrderDetails,
    closeOrderDetails
} = orderSlice.actions;

export default orderSlice.reducer;