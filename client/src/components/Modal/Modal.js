import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, modalOpen, handleClose }) => {

    useEffect(() => {
        if(modalOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [modalOpen]);

    return ReactDOM.createPortal(
        <div onClick={handleClose} className={`modal modal-overlay ${modalOpen ? "active" : ""}`}>
            {children}
        </div>
    , document.querySelector("#modal"));
};

export default Modal;