import {useEffect} from "react";
import app from './app.module.css';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {fetchIngredients} from "../../services/slices/ingredientsSlice";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

const App = () => {

    const dispatch = useDispatch();
    const {
        ingredients,
        status,
        error
    } = useSelector(state => state.ingredients);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, []);

    return (
        <>
            <AppHeader/>
            <main className={app.main}>
                {!error && status !== 'loading' && ingredients.length && (
                    <>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </DndProvider>
                    </>
                )}
                {status === 'loading' &&
                    <h2 className="text text_type_main-medium">Loading...</h2>
                }
                {error && (
                    <h2 className="text text_type_main-medium">
                        Данные не загружены. Ошибка на сервере!
                    </h2>
                )}
            </main>
        </>
    );
}

export default App;
