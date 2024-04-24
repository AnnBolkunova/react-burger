import ingredientDetails from './ingredient-details.module.css';
import {dataPropTypes} from "../../../utils/types";

const IngredientDetails = ({ingredient}) => {

    return (
        <div className={ingredientDetails.container}>
            <img className={ingredientDetails.image}
                 src={ingredient.image_large}
                 alt={ingredient.name}
            />
            <h3 className='text text_type_main-medium pt-4'>{ingredient.name}</h3>
            <ul className={ingredientDetails.content}>
                <li className={ingredientDetails.content_item}>
                    <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</p>
                </li>
                <li className={ingredientDetails.content_item}>
                    <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</p>
                </li>
                <li className={ingredientDetails.content_item}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</p>
                </li>
                <li className={ingredientDetails.content_item}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredient: dataPropTypes
};

export default IngredientDetails;