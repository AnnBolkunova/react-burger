import {FC, useMemo} from 'react';
import {useAppSelector} from "../../../services/store";
import {v4 as uuidv4} from 'uuid';
import {CircleImage} from "../../order-card/circle-image/circle-image";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info-details.module.css';
import {TIngredient} from "../../../utils/types";

type TOrdersInfoDetails = {
    details: TIngredient[];
}

const OrdersInfoDetails: FC<TOrdersInfoDetails> = ({details}) => {

    const {ingredients} = useAppSelector(store => store.ingredients);

    const count = (elem: object) => {
        let count = details?.filter((item) => {
            return item === elem;
        }).length
        return count
    }

    const orderIngredient = useMemo(() => {
        return details?.map((elem) => {
            return ingredients?.find((item) => {
                return elem._id === item._id
            })
        })
    }, [details, ingredients]);

    return (
        <div className={styles.container}>
            {orderIngredient && [...new Set(orderIngredient)].map((item) => {
                return (
                    <li className={`${styles.item} pb-3`} key={uuidv4()}>
                        {item && (
                            <>
                                <div className={styles.info}>
                                    <CircleImage image={item.image} alt={item.name} key={uuidv4()}/>
                                    <p className={`${styles.text} text text_type_main-default pl-4`}>{item.name}</p>
                                </div>
                                <div className={styles.price}>
                                    <p className='text text_type_digits-default pr-2'> {count(item)} x {item.type === 'bun' ? item.price * 2 : item.price}</p>
                                    <CurrencyIcon type="primary" key={uuidv4()}/>
                                </div>
                            </>
                        )}
                    </li>
                )
            })}
        </div>
    )
};

export default OrdersInfoDetails;