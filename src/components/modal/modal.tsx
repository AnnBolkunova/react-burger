import React, {ReactNode, useEffect} from "react";
import ModalOverlay from "./modal-overlay/modal-overlay";
import {createPortal} from "react-dom";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from '../modal/modal.module.css';

const modalRoot = document.getElementById("modal");

interface IModalProps {
    title?: string;
    onClose: () => void;
    children: ReactNode;
}


const Modal: React.FC<IModalProps> = ({onClose, title, children}) => {

    useEffect(() => {
        const closeByEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', closeByEscape);
        return () => {
            document.removeEventListener('keydown', closeByEscape);
        }
    }, [onClose]);

    return createPortal(
        (
            <ModalOverlay onClose={onClose}>
                <div className={modalStyles.container}>
                    <div
                        className={
                            title ? modalStyles.header_title : modalStyles.header_no_title
                        }
                    >
                        {title && <p className="text text_type_main-large">{title}</p>}
                        <CloseIcon
                            type="primary"
                            onClick={onClose}
                        />
                    </div>
                    {children}
                </div>
            </ModalOverlay>
        ),
        modalRoot!
    );
}

export default Modal;