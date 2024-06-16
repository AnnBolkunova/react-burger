import {orderData} from "../../../utils/constants";
import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../services/store";
import {createOrderThunk} from "../../../services/slices/orderSlice";
import orderStyles from '../order-details/order-details.module.css';
import orderImg from '../../../images/order accpeted/popup/done.png';

const OrderDetails: FC = () => {

    const dispatch = useAppDispatch();
    const {
        bun,
        ingredients: constructorIngredients
    } = useAppSelector((state) => state.burgerConstructor);
    const {
        name,
        number,
        isLoading,
        hasError
    } = useAppSelector((state) => state.orderDetails);


    useEffect(() => {
        let ingredients = constructorIngredients.map((el) => el._id);
        let order = {ingredients: [bun!._id, ...ingredients, bun!._id]};

        dispatch(createOrderThunk(order));
        // eslint-disable-next-line
    }, []);

    return (
        <div className={orderStyles.order_container}>
            {!isLoading && !hasError && (
                <>
                    <h2 className='text text_type_digits-large mb-8'>{number}</h2>
                    <p className='text text_type_main-medium mb-15'>{name}</p>
                    <img className={orderStyles.image} src={orderImg} alt='status'/>
                    <p className='text text_type_main-default mb-2'>{orderData.status}</p>
                    <p className='text text_type_main-default text_color_inactive'>{orderData.text}</p>
                </>
            )}
            {isLoading && (
                <p className="text text_type_main-medium">Loading...</p>
            )}
            {hasError && (
                <p className="text text_type_main-medium">Не удалось создать заказ. Ошибка на сервере!</p>
            )}
        </div>
    )
}

export default OrderDetails;