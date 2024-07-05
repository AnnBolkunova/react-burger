import {FC} from "react";
import styles from "./orders.module.css";
import OrderCard from "../order-card/order-card";
import {useLocation, Link} from "react-router-dom";
import {useAppSelector} from "../../services/store";
import {selectFeedOrders} from "../../services/orders/ordersSlice";

const Orders: FC = () => {

    const orders = useAppSelector(selectFeedOrders);
    const location = useLocation();

    return (
        <div className={styles.container}>
            {orders && orders.map((order, index) => {
                return (
                    <Link
                        to={`/feed/${order._id}`}
                        state={{background: location}}
                        className={`${styles.link}`} key={order._id}
                    >

                        <OrderCard order={order} status={order.status} key={index}/>
                    </Link>
                )
            })}
        </div>
    );
};

export default Orders;