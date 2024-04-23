import IngredientItem from "../ingredient-item/ingredient-item";
import groupStyles from "./ingredients-group.module.css";
import PropTypes from "prop-types";
import {dataPropTypes} from "../../../utils/types";

const IngredientsGroup = ({name, data, openDetailsModal}) => {

    return (
        <div className={groupStyles.menuBlock}>
            <p className="text text_type_main-medium">{name}</p>
            <div className={groupStyles.list}>
                {data.map((item) => (
                    <IngredientItem
                        key={item._id}
                        item={item}
                        openDetailsModal={openDetailsModal}
                    />
                ))}
            </div>
        </div>
    );
};

IngredientsGroup.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    openDetailsModal: PropTypes.func.isRequired
};

export default IngredientsGroup;