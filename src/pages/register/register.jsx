import {useState, useCallback} from "react";
import {Link, Navigate} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {registerThunk} from "../../services/slices/authSlice";
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";

const RegisterPage = () => {

    const {accessToken} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({email: "", password: "", name: ""});

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = useCallback((e) => {
            e.preventDefault();

            dispatch(registerThunk(formValue));
        },
        [formValue]
    );

    if (accessToken) {
        return <Navigate to="/"/>;
    }

    return (
        <form className={styles.registration} onSubmit={submitForm}>
            <h3 className="text_type_main-medium">Регистрация</h3>
            <Input
                name="name"
                type="text"
                onChange={handleChange}
                value={formValue.name}
                placeholder={"Имя"}
            />
            <EmailInput
                name="email"
                onChange={handleChange}
                value={formValue.email}
            />
            <PasswordInput
                name="password"
                onChange={handleChange}
                value={formValue.password}
            />
            <Button htmlType="submit">Зарегистрироваться</Button>
            <div className={`${styles.line} mt-9`}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Уже зарегистрированы?
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

export default RegisterPage;