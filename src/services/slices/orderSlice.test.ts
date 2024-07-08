import orderReducer, {
    createOrderThunk,
    initialState,
    showOrderDetails,
    closeOrderDetails
} from "./orderSlice";
import {TCreatedOrder} from "../../utils/types";

describe("orderSlice", () => {
    it("should return the initial state", () => {
        expect(orderReducer(undefined, {type: ""})).toEqual(initialState);
    });

    it("should handle pending create order", () => {
        const state = {
            ...initialState,
            hasError: true,
            name: "Burger",
            number: 5634,
        };

        const action = {type: createOrderThunk.pending.type};
        const result = orderReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            isLoading: true,
        });
    });

    it("should handle successful create order", () => {
        const state = {
            ...initialState,
            hasError: true,
            isLoading: true,
        };

        const order: TCreatedOrder = {
            name: "Burger",
            number: 5634,
        };

        const action = {type: createOrderThunk.fulfilled.type, payload: order};
        const result = orderReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            name: order.name,
            number: order.number,
        });
    });

    it("should handle failed create order", () => {
        const state = {
            ...initialState,
            isLoading: true,
            name: "Burger",
            number: 5634,
        };

        const action = {type: createOrderThunk.rejected.type};
        const result = orderReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            hasError: true,
        });
    });

    it("should handle 'showOrderDetails'", () => {
        const result = orderReducer(initialState, showOrderDetails());

        expect(result).toEqual({
            ...initialState,
            isOpen: true,
        });
    });

    it("should handle 'closeOrderDetails'", () => {
        const state = {
            ...initialState,
            isOpen: true,
            name: "Burger",
            number: 5634,
        };

        const result = orderReducer(state, closeOrderDetails());

        expect(result).toEqual(initialState);
    });
});
