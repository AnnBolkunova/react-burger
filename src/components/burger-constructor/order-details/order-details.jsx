import {orderData} from "../../../utils/constants";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createOrderThunk} from "../../../services/slices/orderSlice";
import orderStyles from '../order-details/order-details.module.css';
import orderImg from '../../../images/order accpeted/popup/done.png';

const OrderDetails = () => {

    const dispatch = useDispatch();
    const {
        bun,
        ingredients: constructorIngredients
    } = useSelector((state) => state.burgerConstructor);
    const {
        name,
        number,
        status,
        error
    } = useSelector((state) => state.orderDetails);


    useEffect(() => {
        let ingredients = constructorIngredients.map((el) => el._id);
        let order = {ingredients: [bun._id, ...ingredients, bun._id]};

        dispatch(createOrderThunk(order));
        // eslint-disable-next-line
    }, []);

    return (
        <div className={orderStyles.order_container}>
            {status !== 'loading' && !error && (
                <>
                    <h2 className='text text_type_digits-large mb-8'>{number}</h2>
                    <p className='text text_type_main-medium mb-15'>{name}</p>
                    <img className={orderStyles.image} src={orderImg} alt='status'/>
                    <p className='text text_type_main-default mb-2'>{orderData.status}</p>
                    <p className='text text_type_main-default text_color_inactive'>{orderData.text}</p>
                </>
            )}
            {status === 'loading' && (
                <p className="text text_type_main-medium">Loading...</p>
            )}
            {error && (
                <p className="text text_type_main-medium">Не удалось создать заказ. Ошибка на сервере!</p>
            )}
        </div>
    )
}

export default OrderDetails;