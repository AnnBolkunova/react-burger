import {useState} from "react";
import {
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import constructorBurger from './burger-constructor.module.css';
import PropTypes from "prop-types";
import {dataPropTypes} from "../../utils/types";

const BurgerConstructor = ({data}) => {

    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

    const confirmOrder = () => {
        setIsOrderModalOpen(true);
    }

    const closeOrderModal = () => {
        setIsOrderModalOpen(false);
    }

    return (
        <section className={constructorBurger.section}>
            <div className={constructorBurger.list}>
                <div className='pl-8'>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
                <ul className={`${constructorBurger.fillings} custom-scroll`}>
                    {data && data.map((item) =>
                        item.type !== 'bun' &&
                        <li key={item._id} style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>
                    )}
                </ul>
                <div className='pl-8'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </div>
            </div>
            <div className={constructorBurger.order}>
                <div className={constructorBurger.price_block}>
                    <p className='text text_type_digits-medium'>630</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={confirmOrder}
                >
                    Оформить заказ
                </Button>
            </div>
            {isOrderModalOpen && (
                <Modal onClose={closeOrderModal}>
                    <OrderDetails/>
                </Modal>
            )}
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
};

export default BurgerConstructor;