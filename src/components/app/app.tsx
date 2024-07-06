import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
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
import OrderInfo from "../order-info/order-info";
import OrderFeedPage from "../../pages/feed/feed";
import app from './app.module.css';
import Modal from "../modal/modal";
import ProfileOrders from "../../pages/profile/profile-orders/profile-orders";
import OrderPage from "../../pages/order-page/order-page";

const App: FC = () => {

    const dispatch = useAppDispatch();
    const {
        isLoading,
        hasError
    } = useAppSelector(state => state.ingredients);
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleCloseModal = () => {
        navigate(-1)
    }

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <div className={app.app}>
            <AppHeader/>
            <main className={app.main}>
                <Routes location={background || location}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                    <Route path="/profile/*" element={<ProtectedRoute children={<ProfilePage/>} anonymous/>}/>
                    <Route path="/profile/orders/:id"
                           element={<ProtectedRoute children={<OrderInfo/>} anonymous/>}/>
                    <Route path="/feed">
                        <Route index path="/feed" element={<OrderFeedPage/>}/>
                        <Route path=":id" element={<OrderPage/>}/>
                    </Route>
                    <Route path="/ingredients/:id" element={<IngredientDetails/>}/>
                    <Route path="*" element={<NotFound404/>}/>
                </Routes>

                {background && (
                    <Routes>
                        <Route
                            path="/ingredients/:id"
                            element={
                                <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                                    <IngredientDetails/>
                                </Modal>
                            }
                        />
                        <Route
                            path="/feed/:id"
                            element={
                                <Modal title="" onClose={handleCloseModal}>
                                    <OrderInfo/>
                                </Modal>
                            }
                        />
                        <Route
                            path="/profile/orders/:id"
                            element={
                                <Modal title="" onClose={handleCloseModal}>
                                    <ProfileOrders/>
                                </Modal>
                            }
                        />
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
    );
}

export default App;
