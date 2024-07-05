import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../services/store";
import {Link, useLocation} from "react-router-dom";
import {wsConnect, wsDisconnect} from "../../../services/middleware/actions";
import {MY_ORDERS_URL} from "../../../utils/constants";
import OrderCard from "../../../components/order-card/order-card";
import styles from './profile-orders.module.css';
import {selectUserFeedOrders} from "../../../services/orders/userOrdersSlice";
import {fetchIngredients} from "../../../services/slices/ingredientsSlice";

const ProfileOrders: FC = () => {

    const orders = useAppSelector(selectUserFeedOrders);
    const {ingredients} = useAppSelector(state => state.ingredients);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
        dispatch(wsConnect(`${MY_ORDERS_URL}?token=${token}`));
        return () => {
            dispatch(wsDisconnect());
        };
    }, []);

    useEffect(() => {
        if (ingredients.length === 0)
            dispatch(fetchIngredients());
    }, [dispatch, ingredients]);

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
    )
};

export default ProfileOrders;