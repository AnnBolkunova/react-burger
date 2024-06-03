import {NavLink, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Profile from "../../components/profile/profile";
import {logoutThunk} from "../../services/slices/authSlice";
import styles from "./profile.module.css";

const ProfilePage = () => {

    const {isLoggedOut} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutThunk());
    };

    if (isLoggedOut) {
        return <Navigate to="/login"/>;
    }

    return (
        <div className={styles.profile}>
            <div className={styles.left}>
                <ul className={styles.menu}>
                    <NavLink
                        to="/profile"
                        className={({isActive}) =>
                            isActive
                                ? styles.menu_item_active
                                : styles.menu_item
                        }
                    >
                        <span>Профиль</span>
                    </NavLink>
                    <NavLink
                        to="/profile/orders"
                        className={({isActive}) =>
                            isActive
                                ? styles.menu_item_active
                                : styles.menu_item
                        }
                    >
                        <span>История заказов</span>
                    </NavLink>
                    <div
                        className={styles.menu_item}
                        style={{cursor: "pointer"}}
                        onClick={handleLogout}
                    >
                        <span>Выход</span>
                    </div>
                </ul>
                <p className="text_type_main-default text_color_inactive"
                   style={{margin: "0"}}
                >
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div className={styles.right}>
                <Profile/>
            </div>
        </div>
    );
};

export default ProfilePage;