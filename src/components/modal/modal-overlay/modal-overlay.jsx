import overlayStyles from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = ({onClose, children}) => {

    const handleOverlayClick = (e) => {
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

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired
};

export default ModalOverlay;