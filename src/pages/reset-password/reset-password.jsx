import {useState, useCallback} from "react";
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setNewPasswordThunk} from "../../services/slices/authSlice";
import {
    Button,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";

const ResetPasswordPage = () => {

    const {accessToken, isResetPassword, isPasswordWasReset} = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({token: "", password: ""});

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const handleResetPassword = useCallback(
        (e) => {
            e.preventDefault();

            dispatch(setNewPasswordThunk(formValue));
        },
        [formValue]
    );

    if (isPasswordWasReset) {
        return <Navigate to="/login"/>
    }

    if (accessToken || !isResetPassword) {
        return <Navigate to="/"/>
    }

    return (
        <form className={styles.reset_password} onSubmit={handleResetPassword}>
            <span className="text_type_main-medium">Восстановление пароля</span>
            <PasswordInput
                onChange={handleChange}
                value={formValue.password}
                name="password"
            />
            <Input
                type="text"
                onChange={handleChange}
                value={formValue.token}
                placeholder="Введите код из письма"
                name="token"
            />
            <Button htmlType="submit">Сохранить</Button>
            <div className={`${styles.line} mt-9`}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Вспомнили пароль?
        </span>
                <Link
                    to="/login"
                    className="text_type_main-default text_color_accent"
                    style={{textDecoration: "none"}}
                >
                    Войти
                </Link>
            </div>
        </form>
    );
};

export default ResetPasswordPage;