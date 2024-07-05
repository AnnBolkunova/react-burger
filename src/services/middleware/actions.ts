import {createAction} from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "ORDERS_CONNECT">("ORDERS_CONNECT");
export const wsDisconnect = createAction("ORDERS_DISCONNECT");