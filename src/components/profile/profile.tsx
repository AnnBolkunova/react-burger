import {useState, useEffect, FormEvent, FC} from "react";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {getUserThunk, updateUserThunk} from "../../services/slices/authSlice";
import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import {TUser} from "../../utils/types";

const Profile: FC = () => {

    const {user} = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [formValue, setFormValue] = useState<TUser>({
        name: user ? user.name : "",
        email: user ? user.email : "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = (e: FormEvent) => {
        e.preventDefault();
        dispatch(updateUserThunk(formValue));
        setFormValue({...formValue, password: ""});
    };

    useEffect(() => {
        dispatch(getUserThunk());
    }, []);

    useEffect(() => {
        if (user) {
            setFormValue({
                ...formValue,
                name: user.name,
                email: user.email
            });
        }
    }, [user]);

    return (
        <form className={styles.profile} onSubmit={handleSave}>
            <Input
                type="text"
                onChange={handleChange}
                value={formValue.name}
                placeholder={"Имя"}
                name="name"
                icon={'EditIcon'}
                extraClass="text_color_inactive"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <EmailInput
                onChange={handleChange}
                value={formValue.email}
                name="email"
                placeholder="Логин"
                isIcon={true}
                extraClass="text_color_inactive"
            />
            <PasswordInput
                onChange={handleChange}
                value={formValue.password || ""}
                name="password"
            />
            <div className={styles.button}>
                <Button htmlType="submit">Сохранить</Button>
            </div>
        </form>
    );
};

export default Profile;