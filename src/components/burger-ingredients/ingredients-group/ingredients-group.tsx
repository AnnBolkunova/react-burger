import {FC, useMemo} from "react";
import {useAppSelector} from "../../../services/store";
import IngredientItem from "../ingredient-item/ingredient-item";
import groupStyles from "./ingredients-group.module.css";
import {TIngredient} from "../../../utils/types";

interface IIngredientsGroupProps {
    name: string;
    ingredients: Array<TIngredient>;
}

const IngredientsGroup: FC<IIngredientsGroupProps> = ({name, ingredients}) => {

    const {bun, ingredients: ingredientsList} = useAppSelector((state) => state.burgerConstructor);

    const statistics = useMemo(() => {
        let res = new Map<string, number>();

        if (ingredients.length === 0) {
            return res;
        }

        const groupType = ingredients[0].type;

        if (groupType === "bun") {
            ingredients.map((el) =>
                res.set(el._id, bun && bun._id === el._id ? 2 : 0)
            );
            return res;
        }

        const items = ingredientsList.filter(
            (el) => el.type === groupType
        );

        return items.reduce(
            (acc: Map<string, number>, e) => acc.set(e._id, (acc.get(e._id) || 0) + 1),
            res
        );
    }, [ingredients, ingredientsList, bun]);

    return (
        <div className={groupStyles.menuBlock}>
            <p className="text text_type_main-medium">{name}</p>
            <div className={groupStyles.list}>
                {ingredients.map((item) => (
                    <IngredientItem
                        key={item._id}
                        item={item}
                        count={statistics.get(item._id) || 0}
                    />
                ))}
            </div>
        </div>
    );
};

export default IngredientsGroup;