import {FC} from "react";
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from "react-dnd";
import itemStyles from '../ingredient-item/ingredient-item.module.css';
import {useLocation, useNavigate} from "react-router-dom";
import {TIngredient} from "../../../utils/types";

interface IngredientItemProps {
    item: TIngredient;
    count: number;
}

const IngredientItem: FC<IngredientItemProps> = ({item, count}) => {

    const location = useLocation();
    const navigate = useNavigate();

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
            <div
                className={itemStyles.block}
                data-test={`burger-ingredient-${item._id}`}
                onClick={() =>
                    navigate(`/ingredients/${item._id}`, {state: {background: location}})
                }
            >
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

export default IngredientItem;