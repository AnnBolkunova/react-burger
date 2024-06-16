import {useState, useCallback, ChangeEvent, FormEvent, FC} from "react";
import {Link, Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {registerThunk} from "../../services/slices/authSlice";
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import {TUser} from "../../utils/types";

const RegisterPage: FC = () => {

    const {accessToken} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const [formValue, setFormValue] = useState<TUser>({email: "", password: "", name: ""});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = useCallback((e: FormEvent) => {
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
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <EmailInput
                name="email"
                onChange={handleChange}
                value={formValue.email}
            />
            <PasswordInput
                name="password"
                onChange={handleChange}
                value={formValue.password || ""}
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