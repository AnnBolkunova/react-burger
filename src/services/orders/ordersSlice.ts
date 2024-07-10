import {TOrderInfo} from "../../utils/types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type TOrdersState = {
    success?: boolean;
    orders?: Array<TOrderInfo>;
    total?: number;
    totalToday?: number;
    connectionError: string;
};

export const initialState: TOrdersState = {
    connectionError: "",
};

const ordersSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        wsOpen: ((state) => state),
        wsClose: (state) => {
            state.connectionError = "";
        },
        wsError: (state, action) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action) => {
            state.success = action.payload.success;
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    }
});

export const {
    wsOpen,
    wsClose,
    wsError,
    wsMessage
} = ordersSlice.actions;

export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedTotal = (state: RootState) => state.feed.total;
export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;

export default ordersSlice;