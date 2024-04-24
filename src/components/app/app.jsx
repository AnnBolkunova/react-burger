import {useState, useEffect} from "react";
import app from './app.module.css';
import api from "../../utils/api";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const App = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        function getIngredients() {
            api.getData()
                .then((res) => {
                    setData(res.data)
                })
                .catch(console.error)
        }

        getIngredients();
    }, []);

    return (
        <>
            <AppHeader/>
            <main className={app.main}>
                <BurgerIngredients
                    data={data}
                />
                <BurgerConstructor
                    data={data}
                />
            </main>
        </>
    );
}

export default App;
