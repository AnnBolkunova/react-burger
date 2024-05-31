import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserThunk, updateUserThunk} from "../../services/slices/authSlice";
import {
    Button, EditIcon,
    EmailInput,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";

const Profile = () => {

    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({
        name: user ? user.name : "",
        email: user ? user.email : "",
        password: "",
    });

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = (e) => {
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
                value={formValue.password}
                name="password"
            />
            <div className={styles.button}>
                <Button htmlType="submit">Сохранить</Button>
            </div>
        </form>
    );
};

export default Profile;