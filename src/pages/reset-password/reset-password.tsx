import {useState, useCallback, ChangeEvent, FormEvent, FC} from "react";
import {Link, Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {setNewPasswordThunk} from "../../services/slices/authSlice";
import {
    Button,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import {TResetPasswordArgs} from "../../utils/types";

const ResetPasswordPage: FC = () => {

    const {accessToken, isResetPassword, isPasswordWasReset} = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch();

    const [formValue, setFormValue] = useState<TResetPasswordArgs>({token: "", password: ""});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const handleResetPassword = useCallback(
        (e: FormEvent) => {
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
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
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