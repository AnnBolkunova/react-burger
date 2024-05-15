import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from "react-dnd";
import itemStyles from '../ingredient-item/ingredient-item.module.css';
import PropTypes from "prop-types";
import {dataPropTypes} from "../../../utils/types";

const IngredientItem = ({item, showDetails, count}) => {

    const handleClick = () => {
        showDetails(item);
    };

    const [{opacity}, ref] = useDrag({
        type: item.type,
        item: item,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    });

    return (
        <div
            className={itemStyles.container}
            ref={ref}
            style={{opacity: opacity}}
        >
            <div className={itemStyles.block} onClick={handleClick}>
                <img src={item.image} alt={item.name}/>
                <div className={itemStyles.price}>
                    <p className='text text_type_digits-default'>{item.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className='text text_type_main-default'>{item.name}</p>
            </div>
            {count > 0 && <Counter size="default" count={count}/>}
        </div>
    );
};

IngredientItem.propTypes = {
    item: dataPropTypes.isRequired,
    showDetails: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired
};

export default IngredientItem;