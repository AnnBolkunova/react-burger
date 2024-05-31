import {Link} from "react-router-dom";
import styles from "./not-found.module.css";

const NotFound404 = () => {

    return (
        <div className={styles.not_found}>
            <h1 className="text text_type_main-large">404</h1>
            <span className="text_type_main-default">Страница не найдена</span>
            <Link
                className="text_type_main-default text_color_accent"
                style={{textDecoration: "none"}}
                to="/">
                Вернуться на главную
            </Link>
        </div>
    );
};

export default NotFound404;