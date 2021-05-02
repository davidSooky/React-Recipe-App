import React from 'react';

const Modal = ({ children, modalOpen, handleClose }) => {
    return (
        <div onClick={handleClose} className={`modal modal-overlay ${modalOpen ? "active" : ""}`}>
            {children}
        </div>
    );
};

export default Modal;
