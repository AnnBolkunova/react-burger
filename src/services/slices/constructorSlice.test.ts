import constructorReducer, {
    initialState,
    addIngredient,
    clearConstructor,
    setBun,
    removeIngredient,
    moveIngredient,
} from "./constructorSlice";
import { TDragIngredientParams, TIngredient } from "../../utils/types";

describe("constructorSlice", () => {
    const ingredient: TIngredient = {
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
        key: "777",
    };

    it("should return the initial state", () => {
        expect(constructorReducer(undefined, { type: "" })).toEqual(initialState);
    });

    it("should handle set bun", () => {
        const result = constructorReducer(initialState, setBun(ingredient));
        expect(result).toEqual({
            ...initialState,
            bun: ingredient,
        });
    });

    it("should handle add ingredient", () => {
        const result = constructorReducer(initialState, addIngredient(ingredient));

        expect(result).toEqual({
            ...initialState,
            ingredients: [ingredient],
        });
    });

    it("should handle remove ingredient if exists", () => {
        let state = {
            ...initialState,
            ingredients: [ingredient],
        };

        const result = constructorReducer(state, removeIngredient(ingredient));

        expect(result).toEqual(initialState);
    });

    it("should handle remove ingredient if doesn't exists", () => {
        let state = {
            ...initialState,
            ingredients: [{ ...ingredient, key: "8888" }],
        };

        const result = constructorReducer(state, removeIngredient(ingredient));

        expect(result).toEqual(state);
    });

    it("should handle move ingredient", () => {
        let state = {
            ...initialState,
            ingredients: [
                ingredient,
                { ...ingredient, key: "888" },
                { ...ingredient, key: "999" },
            ],
        };

        const params: TDragIngredientParams = {
            fromIndex: 0,
            toIndex: 1,
        };

        const result = constructorReducer(state, moveIngredient(params));

        expect(result).toEqual({
            ...initialState,
            ingredients: [
                { ...ingredient, key: "888" },
                ingredient,
                { ...ingredient, key: "999" },
            ],
        });
    });

    it("should handle clear constructor", () => {
        let state = {
            bun: ingredient,
            ingredients: [ingredient],
        };

        const result = constructorReducer(state, clearConstructor());

        expect(result).toEqual(initialState);
    });
});
