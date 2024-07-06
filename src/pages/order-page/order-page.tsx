import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {useParams} from "react-router-dom";
import {fetchOrderById} from "../../services/slices/orderSlice";
import OrderInfo from "../../components/order-info/order-info";
import styles from "./order-page.module.css";

const OrderPage: FC = () => {

    const {orderInfo} = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();
    let {id} = useParams();

    useEffect(() => {
        if (id && orderInfo === null) {
            dispatch(fetchOrderById(Number(id)));
        }
    }, [orderInfo, id, dispatch]);

    return (
        <main className={styles.order_page}>
            <div className={styles.container}>
                {orderInfo !== null && <OrderInfo/>}
            </div>
        </main>
    );
};

export default OrderPage;