import {useMemo} from "react";
import {useSelector} from "react-redux";
import IngredientItem from "../ingredient-item/ingredient-item";
import groupStyles from "./ingredients-group.module.css";
import PropTypes from "prop-types";
import {dataPropTypes} from "../../../utils/types";

const IngredientsGroup = ({name, showDetails, ingredients}) => {

    const {bun, ingredients: ingredientsList} = useSelector((state) => state.burgerConstructor);

    const statistics = useMemo(() => {
        if (ingredients.length === 0) {
            return {};
        }

        const groupType = ingredients[0].type;
        let res = new Map();

        if (groupType === "bun") {
            ingredients.map((el) =>
                res.set(el._id, bun && bun._id === el._id ? 1 : 0)
            );
            return res;
        }

        const items = ingredientsList.filter(
            (el) => el.type === groupType
        );

        return items.reduce(
            (acc, e) => acc.set(e._id, (acc.get(e._id) || 0) + 1),
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
                        showDetails={showDetails}
                        count={statistics.get(item._id) || 0}
                    />
                ))}
            </div>
        </div>
    );
};

IngredientsGroup.propTypes = {
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    showDetails: PropTypes.func.isRequired
};

export default IngredientsGroup;