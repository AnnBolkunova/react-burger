import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import api from "../../utils/api";
import {checkResponse} from "../../utils/check-response";
import {TCreatedOrder, TFetchOrder, TOrder, TOrderInfo} from "../../utils/types";
import {ThunkAPI} from "../store";
import {fetchWithRefresh} from "../../utils/auth-helper";
import {BASE_URL} from "../../utils/config";
import {clearConstructor} from "./constructorSlice";

interface IOrderItem {
    number: boolean
}

interface IFetchOrderResponse {
    name: string,
    order: IOrderItem,
    success: boolean
}

interface IFetchOrderInfoResponse {
    name: string,
    orders: Array<TOrderInfo>,
    success: boolean
}

export const createOrderThunk = createAsyncThunk<TCreatedOrder, TOrder, ThunkAPI>(
    "order/createOrderThunk",
    async (order, thunkAPI) => {
        const res = await fetchWithRefresh(`${BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("accessToken"),
            } as HeadersInit,
            body: JSON.stringify(order),
        })

        if (res.success) {
            thunkAPI.dispatch(clearConstructor());
            return {name: res.name, number: res.order.number} as TCreatedOrder;
        } else {
            return thunkAPI.rejectWithValue("");
        }
    }
);

export const getOrders = createAsyncThunk<IFetchOrderResponse, TFetchOrder, ThunkAPI>(
    "order/getOrdersThunk",
    async (params, thunkAPI) => {
        const res = await api.fetchOrders(params)
            .then(checkResponse);

        if (res.success) {
            return {name: res.name, order: res.order, success: res.success} as IFetchOrderResponse;
        } else {
            return thunkAPI.rejectWithValue("");
        }
    }
)

export const fetchOrderById = createAsyncThunk<IFetchOrderInfoResponse, number, ThunkAPI>(
    'fetchOrderInfo',
    async (id, thunkAPI) => {
        const res: IFetchOrderInfoResponse = await api.fetchOrderInfo(id)
            .then(checkResponse);
        debugger

        if (res.success) {
            return {name: res.name, orders: res.orders, success: res.success} as IFetchOrderInfoResponse;
        } else {
            return thunkAPI.rejectWithValue("");
        }
    }
)

type TOrderSliceState = {
    name: string;
    number: number | null;
    order: IOrderItem | null,
    orderInfo?: TOrderInfo;
    isOpen: boolean;
    isLoading: boolean;
    hasError: boolean;
};

const initialState: TOrderSliceState = {
    name: "",
    number: null,
    order: null,
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
            state.number = null;
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
            .addCase(createOrderThunk.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.order = action.payload.order;
            })
            .addCase(getOrders.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(fetchOrderById.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderInfo = action.payload.orders[0];
                state.hasError = false;
            })
            .addCase(fetchOrderById.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    },
});

export const {
    showOrderDetails,
    closeOrderDetails
} = orderSlice.actions;

export default orderSlice.reducer;