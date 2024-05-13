import {useCallback, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from "./ingredients-group/ingredients-group";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import {switchTab} from "../../services/slices/ingredientsSlice";
import {
    showDetails,
    closeDetails,
} from "../../services/slices/ingredientDetailsSlice";
import stylesIng from './burger-ingredients.module.css';

const BurgerIngredients = () => {

    const dispatch = useDispatch();
    const {ingredients, currentTab} = useSelector((state) => state.ingredients);
    const {isOpen, ingredient} = useSelector((state) => state.ingredientDetails);

    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);
    const tabsRef = useRef(null);

    const selectGroup = (name) => {
        dispatch(switchTab(name));

        // eslint-disable-next-line default-case
        switch (name) {
            case "bun":
                bunsRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                });
                break;
            case "sauce":
                saucesRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                });
                break;
            case "main":
                mainsRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                });
                break;
        }
    };

    const handleScrollBlocks = () => {
        const tabsBottom = tabsRef.current.getBoundingClientRect().bottom;
        const bunsTop = bunsRef.current.getBoundingClientRect().top;
        const saucesTop = saucesRef.current.getBoundingClientRect().top;
        const mainTop = mainsRef.current.getBoundingClientRect().top;

        const bunsDelta = Math.abs(bunsTop - tabsBottom);
        const saucesDelta = Math.abs(saucesTop - tabsBottom);
        const mainDelta = Math.abs(mainTop - tabsBottom);

        const min = Math.min(bunsDelta, saucesDelta, mainDelta);

        const newTab =
            min === bunsDelta ? "bun" : min === saucesDelta ? "sauce" : "main";

        if (newTab !== currentTab) {
            dispatch(switchTab(newTab));
        }
    };

    const openDetailsModal = useCallback((item) => {
        dispatch(showDetails(item));
    }, []);

    const closeDetailsModal = () => {
        dispatch(closeDetails());
    };

    return (
        <section className={stylesIng.ingredients}>
            <h1 className='pt-10 text text_type_main-large'>Соберите бургер</h1>
            <nav className={stylesIng.nav} ref={tabsRef}>
                <Tab
                    value="bun"
                    active={currentTab === "bun"}
                    onClick={selectGroup}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauce"
                    active={currentTab === "sauce"}
                    onClick={selectGroup}
                >
                    Соусы
                </Tab>
                <Tab
                    value="main"
                    active={currentTab === "main"}
                    onClick={selectGroup}
                >
                    Начинки
                </Tab>
            </nav>
            <ul
                className={stylesIng.common_list}
                onScroll={handleScrollBlocks}
            >
                <li ref={bunsRef}>
                    <IngredientsGroup
                        name="Булки"
                        ingredients={ingredients.filter((item) => item.type === "bun")}
                        showDetails={openDetailsModal}
                    />
                </li>
                <li ref={saucesRef}>
                    <IngredientsGroup
                        name="Соусы"
                        ingredients={ingredients.filter((item) => item.type === "sauce")}
                        showDetails={openDetailsModal}
                    />
                </li>
                <li ref={mainsRef}>
                    <IngredientsGroup
                        name="Начинки"
                        ingredients={ingredients.filter((item) => item.type === "main")}
                        showDetails={openDetailsModal}
                    />
                </li>
            </ul>
            {isOpen && (
                <Modal
                    onClose={closeDetailsModal}
                    title="Детали ингредиента">
                    <IngredientDetails ingredient={ingredient}/>
                </Modal>
            )}
        </section>
    )
}

export default BurgerIngredients;