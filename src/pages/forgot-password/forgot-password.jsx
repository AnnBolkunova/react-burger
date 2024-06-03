import {useState, useCallback} from "react";
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {emailVerifyThunk} from "../../services/slices/authSlice";
import {
    Button,
    EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";


const ForgotPasswordPage = () => {

    const {accessToken, isResetPassword} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({email: ""});

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const handleResetPassword = useCallback(
        (e) => {
            e.preventDefault();

            dispatch(emailVerifyThunk(formValue.email));
        },
        [formValue]
    );

    if (accessToken) {
        return <Navigate to="/"/>;
    }

    if (isResetPassword) {
        return <Navigate to="/reset-password"/>
    }

    return (
        <form className={styles.forgot_password} onSubmit={handleResetPassword}>
            <span className="text_type_main-medium">Восстановление пароля</span>
            <EmailInput onChange={handleChange} value={formValue.email} name="email"/>
            <Button htmlType="submit">Восстановить</Button>
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

export default ForgotPasswordPage;