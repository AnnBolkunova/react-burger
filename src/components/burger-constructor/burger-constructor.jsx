import {useMemo, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    CurrencyIcon,
    Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorItem from "./constructor-item/constructor-item";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";
import {
    removeIngredient,
    setBun,
    addIngredient,
    moveIngredient,
} from "../../services/slices/constructorSlice";
import {showOrderDetails, closeOrderDetails} from "../../services/slices/orderSlice";
import {useDrop} from "react-dnd";
import {v4 as uuidv4} from 'uuid';
import constructorBurger from './burger-constructor.module.css';

const BurgerConstructor = () => {

    const dispatch = useDispatch();
    const {bun, ingredients: constructorIngredients} = useSelector((state) => state.burgerConstructor);
    const {isOpen} = useSelector((state) => state.orderDetails);

    const [, dropTarget] = useDrop({
        accept: ["bun", "sauce", "main"],
        canDrop: (item, monitor) => {
            return item.index === undefined;
        },
        drop: (item) => {
            if (item.type === "bun") {
                dispatch(setBun(item));
            } else {
                dispatch(addIngredient({...item, key: uuidv4()}));
            }
        },
    });

    const deleteItem = (item) => {
        dispatch(removeIngredient(item));
    };

    const moveItem = useCallback(
        (dragIndex, hoverIndex) => {
            dispatch(moveIngredient({fromIndex: dragIndex, toIndex: hoverIndex}));
        },
        [constructorIngredients]
    );


    const totalPrice = useMemo(() => {
        let totalPrice = constructorIngredients.reduce(
            (acc, item) => item.price + acc,
            0
        );

        if (bun !== null) {
            totalPrice += bun.price * 2;
        }

        return totalPrice;
    }, [bun, constructorIngredients]);

    const confirmOrder = () => {
        dispatch(showOrderDetails());
    };

    const closeOrderModal = () => {
        dispatch(closeOrderDetails());
    };

    return (
        <section className={constructorBurger.section}>
            <div className={constructorBurger.list} ref={dropTarget}>
                <div className={constructorBurger.bun}>
                    {bun ? (
                        <ConstructorItem type="top" item={bun}/>
                    ) : (
                        <div className={constructorBurger.placeholder_item_top}>
                            <span>Выберите булки</span>
                        </div>
                    )}
                </div>
                <div className={constructorBurger.fillings}>
                    {constructorIngredients.length ? (
                        constructorIngredients.map((item, index) => (
                            <ConstructorItem
                                key={item.key}
                                item={item}
                                index={index}
                                onRemove={deleteItem}
                                moveItem={moveItem}
                            />
                        ))
                    ) : (
                        <div className={constructorBurger.placeholder_fillings_item}>
                            <span>Выберите начинку</span>
                        </div>
                    )}
                </div>
                <div className={constructorBurger.bun}>
                    {bun ? (
                        <ConstructorItem type="bottom" item={bun}/>
                    ) : (
                        <div className={constructorBurger.placeholder_item_bottom}>
                            <span>Выберите булки</span>
                        </div>
                    )}
                </div>
            </div>
            <div className={constructorBurger.order}>
                <p className={constructorBurger.price_block}>
                    {totalPrice}
                    <CurrencyIcon type="primary"/>
                </p>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={confirmOrder}
                >
                    Оформить заказ
                </Button>
            </div>
            {isOpen && (
                <Modal onClose={closeOrderModal}>
                    <OrderDetails/>
                </Modal>
            )}
        </section>
    )
}

export default BurgerConstructor;