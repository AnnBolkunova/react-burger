import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import header from '../app-header/app-header.module.css';

const AppHeader = () => {

    return (
        <header className={header.header}>
            <div className={header.nav}>
                <nav className={header.nav_block}>
                    <a href="#" className={header.nav_item}>
                        <BurgerIcon type="primary"/>
                        <p className="text text_type_main-default">
                            Конструктор
                        </p>
                    </a>
                    <a href="#" className={header.nav_item}>
                        <ListIcon type="secondary"/>
                        <p className="text text_type_main-default text_color_inactive">
                            Лента заказов
                        </p>
                    </a>
                </nav>
                <Logo/>
                <nav className={header.nav_item_single}>
                    <a href="#" className={header.nav_item}>
                        <ProfileIcon type="secondary"/>
                        <p className="text text_type_main-default text_color_inactive">
                            Личный кабинет
                        </p>
                    </a>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader;