import ordersSlice, {
    initialState,
    wsOpen,
    wsClose,
    wsError,
    wsMessage
} from "./ordersSlice";
import {TOrders} from "../../utils/types";

describe("ordersReducer", () => {
    const orders: TOrders = {
        success: true,
        orders: [
            {
                _id: "fg123456",
                ingredients: ["hj323232", "jk3erere"],
                status: "done",
                name: "Burger",
                number: 3345,
                createdAt: new Date(),
                updatedAt: new Date(),
                total: 1
            },
        ],
        total: 2,
        totalToday: 1,
    };

    it("should return the initial state", () => {
        expect(ordersSlice.reducer(undefined, {type: ""})).toEqual(initialState);
    });

    it("should handle wsOpen action", () => {
        // expect(ordersSlice.reducer(initialState, wsOpen)).toEqual(initialState);

        const result = ordersSlice.reducer(initialState, wsOpen());

        expect(result).toEqual({
            ...initialState
        });
    });

    it("should handle wsClose action", () => {
        const state = {
            ...initialState,
            connectionError: "error",
        };

        const result = ordersSlice.reducer(state, wsClose());

        expect(result).toEqual(initialState);
    });

    it("should handle wsError action", () => {
        const error: string = "error";

        const result = ordersSlice.reducer(initialState, wsError(error));

        expect(result).toEqual({
            ...initialState,
            connectionError: error,
        });
    });

    it("should handle wsMessage action", () => {
        const result = ordersSlice.reducer(initialState, wsMessage({orders}));

        expect(result).toEqual({
            ...initialState,
            orders
        });
    });
});
