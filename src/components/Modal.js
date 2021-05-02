import React, { useEffect } from 'react';

const Modal = ({ children, modalOpen, handleClose }) => {

    useEffect(() => {
        if(modalOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [modalOpen]);

    return (
        <div onClick={handleClose} className={`modal modal-overlay ${modalOpen ? "active" : ""}`}>
            {children}
        </div>
    );
};

export default Modal;
