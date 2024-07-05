import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    Middleware,
} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type TWSActionTypes = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    sendMessage?: ActionCreatorWithPayload<any>;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (
    wsActions: TWSActionTypes
): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;

        return (next) => (action) => {

            const {
                connect,
                disconnect,
                sendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
            } = wsActions;

            const {dispatch} = store;

            if (connect.match(action)) {
                socket = new WebSocket(action.payload);

                socket.onopen = (_) => {
                    dispatch(onOpen());
                };

                socket.onerror = (_) => {
                    dispatch(onError("socket error!"));
                };

                socket.onmessage = (event) => {
                    const {data} = event;
                    try {
                        const parsedData = JSON.parse(data);
                        const {success, ...orders} = parsedData;
                        dispatch(onMessage(orders));
                    } catch (e) {
                        dispatch(onError((e as { message: string }).message))
                    }
                };

                socket.onclose = (_) => {
                    dispatch(onClose());
                };
            }


            if (socket && sendMessage?.match(action)) {
                try {
                    socket.send(JSON.stringify(action.payload));
                } catch (e) {
                    dispatch(onError((e as { message: string }).message))
                }
            }

            if (socket && disconnect.match(action)) {
                socket.close();
                socket = null;
            }

            next(action);
        };
    };
};