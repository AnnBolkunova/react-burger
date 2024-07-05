import {configureStore, combineReducers} from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredientsSlice";
import constructorReducer from "./slices/constructorSlice";
import orderSliceReducer from "./slices/orderSlice";
import authSliceReducer from "./slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import ordersSlice from "./orders/ordersSlice";
import {
    wsOpen,
    wsClose,
    wsError,
    wsMessage
} from "./orders/ordersSlice";
import userOrdersSlice from "./orders/userOrdersSlice";
import {
    userWsOpen,
    userWsClose,
    userWsError,
    userWsMessage
} from "./orders/userOrdersSlice";
import {
    wsConnect,
    wsDisconnect
} from "./middleware/actions";
import {socketMiddleware} from "./middleware/socketMiddleware";
import {enableMapSet} from 'immer'

enableMapSet()

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderSliceReducer,
    auth: authSliceReducer,
    feed: ordersSlice.reducer,
    userFeed: userOrdersSlice.reducer
});

const ordersMiddleware = socketMiddleware({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onClose: wsClose,
    onOpen: wsOpen,
    onError: wsError,
    onMessage: wsMessage,
});

const userOrdersMiddleware = socketMiddleware({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onClose: userWsClose,
    onOpen: userWsOpen,
    onError: userWsError,
    onMessage: userWsMessage,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({serializableCheck: false}).concat(ordersMiddleware, userOrdersMiddleware)
    }
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type ThunkAPI = { dispatch: AppDispatch };

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

