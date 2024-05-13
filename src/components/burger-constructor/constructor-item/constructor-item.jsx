import {useRef} from "react";
import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag, useDrop} from "react-dnd";
import stylesItem from '../burger-constructor.module.css';
import PropTypes from "prop-types";
import {dataPropTypes} from "../../../utils/types";

const ConstructorItem = ({item, type, index, onRemove, moveItem}) => {
    const isLocked = type !== undefined || !item;
    let suffix = "";

    if (item) {
        if (type === "top") {
            suffix = " (верх)";
        } else if (type === "bottom") {
            suffix = " (низ)";
        }
    }

    const text = item
        ? item.name + suffix
        : type === "top" || type === "bottom"
            ? "Выберите булки"
            : "Выберите начинку";

    const onClose = () => {
        if (onRemove) {
            onRemove(item);
        }
    };

    const ref = useRef(null);

    const [{opacity}, drag] = useDrag({
        type: item.type,
        item: {...item, index: index ? index : -1},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    });

    const [{handlerId}, drop] = useDrop({
        accept: ["sauce", "main"],
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),
        canDrop: () => {
            return type === undefined;
        },
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }

            if (item.index === undefined) {
                return;
            }

            if (!moveItem) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveItem(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    if (type !== "bun") {
        drag(drop(ref));
    }

    return (
        <div
            className={stylesItem.item}
            {...(type !== "bun" && {
                ref: ref,
                style: {opacity: opacity},
                "data-handler-id": handlerId,
            })}
        >
            <div style={{visibility: isLocked ? "hidden" : "visible"}}>
                <DragIcon type="primary"/>
            </div>
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
                thumbnail={""}
                {...(item && {
                    price: item.price,
                    thumbnail: item.image,
                    handleClose: onClose,
                })}
            />
        </div>
    );
};

ConstructorItem.propTypes = {
    item: dataPropTypes.isRequired,
    type: PropTypes.string,
    onRemove: PropTypes.func,
    index: PropTypes.number,
    moveItem: PropTypes.func,
};

export default ConstructorItem;