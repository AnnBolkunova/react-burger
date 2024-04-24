import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from '../ingredient-item/ingredient-item.module.css';
import PropTypes from "prop-types";
import {dataPropTypes} from "../../../utils/types";

const IngredientItem = ({item, openDetailsModal}) => {

    const handleClick = () => {
        openDetailsModal(item);
    };

    return (
        <div className={itemStyles.container}>
            <div className={itemStyles.block} onClick={handleClick}>
                <img src={item.image} alt={item.name}/>
                <div className={itemStyles.price}>
                    <p className='text text_type_digits-default'>{item.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className='text text_type_main-default'>{item.name}</p>
            </div>
            <Counter size="default" count={1}/>
        </div>
    );
};

IngredientItem.propTypes = {
    item: dataPropTypes.isRequired,
    openDetailsModal: PropTypes.func.isRequired
};

export default IngredientItem;