import ingredientsReducer, {
    fetchIngredients,
    initialState,
    switchTab,
} from "./ingredientsSlice";
import {TIngredient} from "../../utils/types";
import {enableMapSet} from "immer";

describe("ingredientsSlice", () => {
    enableMapSet();

    const ingredients: Array<TIngredient> = [
        {
            _id: "fd12278318",
            name: "First",
            type: "bun",
            proteins: 50,
            fat: 60,
            carbohydrates: 70,
            calories: 200,
            price: 1000,
            image: "image",
            image_mobile: "mobile",
            image_large: "large",
        },
        {
            _id: "ui56462374",
            name: "First",
            type: "bun",
            proteins: 50,
            fat: 60,
            carbohydrates: 70,
            calories: 200,
            price: 1000,
            image: "image",
            image_mobile: "mobile",
            image_large: "large",
        },
    ];

    it("should return the initial state", () => {
        expect(ingredientsReducer(undefined, {type: ""})).toEqual(initialState);
    });

    it("should handle switch tab", () => {
        const tab: string = "main";
        const result = ingredientsReducer(initialState, switchTab(tab));

        expect(result).toEqual({
            ...initialState,
            currentTab: tab,
        });
    });

    it("should handle pending fetch ingredients", () => {
        const state = {
            ...initialState,
            hasError: true,
            ingredients,
        };

        const action = {type: fetchIngredients.pending.type};
        const result = ingredientsReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            ingredients,
            isLoading: true,
        });
    });

    it("should handle successful fetch ingredients", () => {
        const state = {
            ...initialState,
            ingredients,
            isLoading: true,
            hasError: true,
        };

        const action = {
            type: fetchIngredients.fulfilled.type,
            payload: ingredients,
        };
        const result = ingredientsReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            ingredients
        });
    });

    it("should handle failed fetch ingredients", () => {
        const state = {
            ...initialState,
            isLoading: true,
            ingredients,
        };

        const action = {type: fetchIngredients.rejected.type};
        const result = ingredientsReducer(state, action);

        expect(result).toEqual({
            ...initialState,
            ingredients,
            hasError: true,
        });
    });
});