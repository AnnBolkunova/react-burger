import React, {ReactNode} from "react";
import overlayStyles from './modal-overlay.module.css';

interface IModalOverlayProps {
    onClose: () => void;
    children: ReactNode;
}

const ModalOverlay: React.FC<IModalOverlayProps> = ({onClose, children}) => {

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={overlayStyles.overlay}
            onClick={handleOverlayClick}
        >
            {children}
        </div>
    )
}

export default ModalOverlay;