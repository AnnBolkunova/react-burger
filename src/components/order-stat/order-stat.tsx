import {FC} from "react";
import styles from "./order-stat.module.css";
import {useAppSelector} from "../../services/store";
import {selectFeedOrders, selectFeedTotal, selectFeedTotalToday} from "../../services/orders/ordersSlice";
import {v4 as uuidv4} from 'uuid';


const OrdersStat: FC = () => {

    const orders = useAppSelector(selectFeedOrders);
    const total = useAppSelector(selectFeedTotal);
    const totalToday = useAppSelector(selectFeedTotalToday);

    if (!orders) {
        return (
            <div className={styles.feed}>
                <p className="text_type_main-default">Загрузка...</p>
            </div>
        );
    }

    if (
        orders.length === 0
    ) {
        return (
            <div className={styles.feed}>
                <p className="text_type_main-default">Заказов пока нет</p>
            </div>
        );
    }

    const doneStatusOrder = orders.filter(order => order.status === 'done').filter((order, index) => index < 15);
    const pendingStatusOrder = orders.filter(order => order.status !== 'done').filter((order, index) => index >= 10);

    return (
        <div className={styles.container}>
            <div className={`${styles.orderBoard} pb-15`}>
                <div className={styles.column}>
                    <p className='text text_type_main-medium pb-6'>Готовы:</p>
                    <ul className={styles.orderList}>
                        {orders && doneStatusOrder.map(order => (
                            <li
                                className={`${styles.item} ${styles.done} text text_type_digits-default`}
                                key={uuidv4()}
                            >
                                {order.number}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.column}>
                    <p className='text text_type_main-medium pb-6'>В работе:</p>
                    <ul className={styles.orderList}>
                        {orders && pendingStatusOrder.map(order => (
                            <li
                                className={`${styles.item} text text_type_digits-default`}
                                key={uuidv4()}
                            >
                                {order.number}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={`${styles.completed} pb-15`}>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>
                <h2 className={`${styles.totalItems} text text_type_digits-large`}>{total}</h2>
            </div>
            <div className={styles.completed}>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <h2 className={`${styles.totalItems} text text_type_digits-large`}>{totalToday}</h2>
            </div>
        </div>)
};

export default OrdersStat;