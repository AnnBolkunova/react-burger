import {useState, useEffect} from "react";
import './app.css';
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
                .catch(err =>
                    console.log(err)
                )
        }

        getIngredients();
    }, []);

    return (
        <>
            <AppHeader/>
            <main className='main'>
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
