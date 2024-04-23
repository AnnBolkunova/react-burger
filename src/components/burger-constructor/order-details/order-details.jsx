import {orderData} from "../../../utils/test-data";
import orderStyles from '../order-details/order-details.module.css';
import orderImg from '../../../images/order accpeted/popup/done.png';

const OrderDetails = () => {

    return (
        <div className={orderStyles.order_container}>
            <h2 className='text text_type_digits-large mb-8'>{orderData.number}</h2>
            <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
            <img className={orderStyles.image} src={orderImg} alt='status'/>
            <p className='text text_type_main-default mb-2'>{orderData.status}</p>
            <p className='text text_type_main-default text_color_inactive'>{orderData.text}</p>
        </div>
    )
}

export default OrderDetails;