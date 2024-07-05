import {FC, useEffect} from "react";
import Orders from "../../components/orders/orders";
import OrdersStat from "../../components/order-stat/order-stat";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {wsConnect, wsDisconnect} from "../../services/middleware/actions";
import styles from "./feed.module.css";
import {ALL_ORDERS_URL} from "../../utils/constants";
import {selectFeedOrders} from "../../services/orders/ordersSlice";
import {fetchIngredients} from "../../services/slices/ingredientsSlice";

const OrderFeedPage: FC = () => {

    const dispatch = useAppDispatch();
    const orders = useAppSelector(selectFeedOrders);
    const {ingredients} = useAppSelector(state => state.ingredients);

    useEffect(() => {
        dispatch(wsConnect(ALL_ORDERS_URL));
        return () => {
            dispatch(wsDisconnect());
        };
    }, []);

    useEffect(() => {
        if (ingredients.length === 0)
            dispatch(fetchIngredients());
    }, [dispatch, ingredients]);

    if (orders === null) {
        return (
            <div className={styles.order_feed}>
                <p className="text_type_main-default">Загрузка...</p>
            </div>
        );
    }

    if (
        orders === undefined ||
        orders.length === 0
    ) {
        return (
            <div className={styles.order_feed}>
                <p className="text_type_main-default">Заказов пока нет</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={`${styles.text} text text_type_main-large pt-10 pb-5`}>Лента заказов</h2>
            <div className={styles.feedOrder}>
                <Orders/>
                <OrdersStat/>
            </div>
        </div>
    );
};

export default OrderFeedPage;