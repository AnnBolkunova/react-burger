import {useState} from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from "./ingredients-group/ingredients-group";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import ingredients from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import {dataPropTypes} from "../../utils/types";

const BurgerIngredients = ({data}) => {

    const [current, setCurrent] = useState('buns');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const buns = data.filter(item => item.type === "bun");
    const sauces = data.filter(item => item.type === "sauce");
    const main = data.filter(item => item.type === "main");

    const openDetailsModal = (item) => {
        setSelectedItem(item);
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
    };

    return (
        <section className={ingredients.ingredients}>
            <h1 className='pt-10 text text_type_main-large'>Соберите бургер</h1>
            <nav className={ingredients.nav}>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </nav>
            <ul className={ingredients.common_list}>
                <li>
                    <IngredientsGroup
                        name="Булки"
                        data={buns}
                        openDetailsModal={openDetailsModal}
                    />
                </li>
                <li>
                    <IngredientsGroup
                        name="Соусы"
                        data={sauces}
                        openDetailsModal={openDetailsModal}
                    />
                </li>
                <li>
                    <IngredientsGroup
                        name="Начинки"
                        data={main}
                        openDetailsModal={openDetailsModal}
                    />
                </li>
            </ul>
            {isDetailsModalOpen && (
                <Modal
                    onClose={closeDetailsModal}
                    title="Детали ингредиента">
                    <IngredientDetails ingredient={selectedItem}/>
                </Modal>
            )}
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
};

export default BurgerIngredients;