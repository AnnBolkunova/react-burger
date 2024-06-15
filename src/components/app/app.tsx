import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AppHeader from "../app-header/app-header";
import {fetchIngredients} from "../../services/slices/ingredientsSlice";
import HomePage from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import NotFound404 from "../../pages/not-found/not-found";
import ProtectedRoute from "../protected-route/protected-route";
import app from './app.module.css';

const App: FC = () => {

    const dispatch = useAppDispatch();
    const {
        ingredients,
        isLoading,
        hasError
    } = useAppSelector(state => state.ingredients);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, []);

    return (
        <BrowserRouter>
            <div className={app.app}>
                <AppHeader/>
                <main className={app.main}>
                    {!hasError && !isLoading && ingredients.length && (
                        <Routes>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                            <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                            <Route path="/profile" element={<ProtectedRoute children={<ProfilePage/>} anonymous/>}/>
                            <Route path="/ingredients/:id" element={<IngredientDetails/>}/>
                            <Route path="*" element={<NotFound404/>}/>
                        </Routes>
                    )}
                    {isLoading &&
                        <h2 className="text text_type_main-medium">Loading...</h2>
                    }
                    {hasError && (
                        <h2 className="text text_type_main-medium">
                            Данные не загружены. Ошибка на сервере!
                        </h2>
                    )}
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
