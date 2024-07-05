import {FC} from 'react';
import styles from './circle-image.module.css';

type TCircleImage = {
    image: string;
    alt: string;
}

export const CircleImage: FC<TCircleImage> = ({image, alt}) => {

    return (
        <div className={styles.border}>
            <div className={styles.item}>
                <img className={styles.img} src={image} alt={alt}/>
            </div>
        </div>
    )
};