import {useCallback, useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearPasswordReset, loginThunk} from "../../services/slices/authSlice";
import {
    Button,
    EmailInput,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";

const LoginPage = () => {

    const {accessToken, isLoggedIn, isPasswordWasReset, status} = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({email: "", password: ""});

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        if (isPasswordWasReset) {
            dispatch(clearPasswordReset());
        }
    }, [isPasswordWasReset]);

    const submitForm = useCallback(
        (e) => {
            e.preventDefault();

            dispatch(loginThunk(formValue));
        },
        [formValue]
    );

    if (isLoggedIn || accessToken) {
        return <Navigate to="/"/>;
    }

    return (
        <form className={styles.login} onSubmit={submitForm}>
            <span className="text_type_main-medium">Вход</span>
            <EmailInput
                onChange={handleChange}
                value={formValue.email}
                name="email"
            />
            <PasswordInput
                onChange={handleChange}
                value={formValue.password}
                name="password"
            />
            <Button htmlType="submit">Войти</Button>
            <div className={`${styles.line} mt-9`}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Вы - новый пользователь?
        </span>

                <Link
                    to="/register"
                    className="text_type_main-default text_color_accent"
                    style={{textDecoration: "none"}}
                >
                    Зарегистрироваться
                </Link>
            </div>
            <div className={styles.line}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Забыли пароль?
        </span>
                <Link
                    to="/forgot-password"
                    className="text_type_main-default text_color_accent"
                    style={{textDecoration: "none"}}
                >
                    Восстановить пароль
                </Link>
            </div>
        </form>
    );
};

export default LoginPage;