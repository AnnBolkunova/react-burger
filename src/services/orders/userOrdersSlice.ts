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

const initialState: TOrdersState = {
    connectionError: "",
};

const userOrdersSlice = createSlice({
    name: "userFeed",
    initialState,
    reducers: {
        userWsOpen: ((state) => state),
        userWsClose: (state) => {
            state.connectionError = "";
        },
        userWsError: (state, action) => {
            state.connectionError = action.payload;
        },
        userWsMessage: (state, action) => {
            state.success = action.payload.success;
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    }
});

export const {
    userWsOpen,
    userWsClose,
    userWsError,
    userWsMessage
} = userOrdersSlice.actions;

export const selectUserFeedOrders = (state: RootState) => state.userFeed.orders;

export default userOrdersSlice;