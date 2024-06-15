import {ChangeEvent, FC, FormEvent, useCallback, useEffect, useState} from "react";
import {Link, Navigate, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {clearPasswordReset, loginThunk} from "../../services/slices/authSlice";
import {
    Button,
    EmailInput,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import {TCredentials} from "../../utils/types";

const LoginPage: FC = () => {

    const {accessToken, isLoggedIn, isPasswordWasReset} = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch();
    const location = useLocation();
    const from = location.state?.from || '/';

    const [formValue, setFormValue] = useState<TCredentials>({email: "", password: ""});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        (e: FormEvent) => {
            e.preventDefault();

            dispatch(loginThunk(formValue));
        },
        [formValue]
    );

    if (isLoggedIn || accessToken) {
        return <Navigate to={from}/>;
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