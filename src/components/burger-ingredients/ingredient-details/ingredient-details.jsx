import {useNavigate, useLocation, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Modal from "../../modal/modal";
import styles from './ingredient-details.module.css';

const IngredientDetails = () => {

    const {ingredients} = useSelector((state) => state.ingredients);
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();
    const background = location.state && location.state.background;

    const ingredient = ingredients.find((el) => el._id === id);

    const content = (
        <div className={styles.container}>
            {!background && (
                <p className="text_type_main-large mt-30">Детали ингредиента</p>
            )}
            <img className={styles.image}
                 src={ingredient.image_large}
                 alt={ingredient.name}
            />
            <h3 className='text text_type_main-medium pt-4'>{ingredient.name}</h3>
            <ul className={styles.content}>
                <li className={styles.content_item}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</p>
                </li>
                <li className={styles.content_item}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</p>
                </li>
                <li className={styles.content_item}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</p>
                </li>
                <li className={styles.content_item}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )

    return (
        <>
            {background ? (
                <Modal onClose={() => navigate(-1)} title="Детали ингредиента">
                    {content}
                </Modal>
            ) : (
                content
            )}
        </>
    )
};

export default IngredientDetails;