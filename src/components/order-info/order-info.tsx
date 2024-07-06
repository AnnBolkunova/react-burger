import {FC, useEffect, useMemo} from "react";
import styles from "./order-info.module.css";
import {useParams, useResolvedPath} from "react-router-dom";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {selectFeedOrders} from "../../services/orders/ordersSlice";
import {ALL_ORDERS_URL, MY_ORDERS_URL} from "../../utils/constants";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {wsConnect, wsDisconnect} from "../../services/middleware/actions";
import {v4 as uuidv4} from 'uuid';
import OrdersInfoDetails from "./order-info-details/order-info-details";
import {TIngredient} from "../../utils/types";

const OrderInfo: FC = () => {

    const orders = useAppSelector(selectFeedOrders);
    const ingredients = useAppSelector(store => store.ingredients.ingredients);
    const dispatch = useAppDispatch();

    const {id} = useParams<{ id: string }>();
    const match = useResolvedPath("").pathname;

    const isProfile = '/profile/orders/';
    const isFeed = '/feed/';

    let order = orders?.find((order) => order._id === id);

    const orderIngredientsData = useMemo(() => {
        return order?.ingredients.map((id) => {
            return ingredients?.find((item) => {
                return id === item._id
            })
        })
    }, [order?.ingredients, ingredients])

    const orderTotalPrice = useMemo(() => {
        return orderIngredientsData?.reduce((sum, item) => {
            if (item?.type === 'bun') {
                return sum += item.price * 2
            }
            return sum += (item ? item.price : 0);
        }, 0);
    }, [orderIngredientsData])

    useEffect(() => {
        if (match.includes(isProfile)) {
            const rawToken = localStorage.getItem("accessToken");
            const token = rawToken!.split(" ")[1];
            dispatch(wsConnect(`${MY_ORDERS_URL}?token=${token}`));
        }
        if (match.includes(isFeed)) {
            dispatch(wsConnect(ALL_ORDERS_URL));
        }
        return () => {
            dispatch(wsDisconnect());
        };
    }, [match]);

    return (
        <>
            {order && (
                <div className={styles.container}>
                    <p className='text text_type_digits-default'>#{order.number}</p>
                    <h2 className={`${styles.name} text text_type_main-medium pt-10`}>{order.name}</h2>
                    {!!order.status &&
                        <p className={`${styles.status} text text_type_main-default pt-3`}>
                            {order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : 'Выполнен'}
                        </p>}
                    <h3 className={`${styles.order} text text_type_main-medium pt-15`}>Состав:</h3>
                    <ul className={`${styles.list}`}>
                        <OrdersInfoDetails details={orderIngredientsData as TIngredient[]} key={id}/>
                    </ul>
                    <div className={`${styles.total} pb-10`}>
                        <p className="text text_type_main-default text_color_inactive">
                            <FormattedDate date={new Date(order.createdAt)}/>
                        </p>
                        <div className={styles.price}>
                            <p className='text text_type_digits-default pr-2'>{orderTotalPrice}</p>
                            <CurrencyIcon type="primary" key={uuidv4()}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default OrderInfo;