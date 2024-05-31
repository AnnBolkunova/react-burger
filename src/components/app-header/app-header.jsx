import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, NavLink} from "react-router-dom";
import styles from '../app-header/app-header.module.css';

const AppHeader = () => {

    return (
        <header className={styles.header}>
            <div className={styles.nav}>
                <nav className={styles.left_menu}>
                    <NavLink
                        to="/"
                        className={({isActive}) =>
                            isActive
                                ? styles.menu_item_active
                                : styles.menu_item
                        }
                    >
                        <BurgerIcon
                            type="primary"
                        />
                        <p className="pl-2">Конструктор</p>
                    </NavLink>
                    <NavLink
                        to="/orders-list"
                        className={({isActive}) =>
                            isActive
                                ? styles.menu_item_active
                                : styles.menu_item
                        }
                    >
                        <ListIcon type="secondary"/>
                        <p className="pl-2">Лента заказов</p>
                    </NavLink>
                </nav>
                <Link to="/" className={styles.logo}>
                    <Logo/>
                </Link>
                <nav className={styles.right_menu}>
                    <NavLink
                        to="/profile"
                        className={({isActive}) =>
                            isActive
                                ? styles.menu_item_active
                                : styles.menu_item
                        }
                    >
                        <ProfileIcon type="secondary"/>
                        <p className="pl-2">Личный кабинет</p>
                    </NavLink>
                </nav>
            </div>
        </header>
    )
};

export default AppHeader;