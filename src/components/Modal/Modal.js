import React from "react";
import './Modal.css';
import successIcon from '../../images/success-icon.svg';
import failureIcon from '../../images/failure-icon.svg';

function Modal({ isOpen, isSuccess, onClose, message }) {
    return (
        <div className={`popup ${isOpen && 'popup_is-opened'}`}>
            <div className="modal">
                <img className="modal__icon" src={isSuccess ? successIcon : failureIcon} alt="Иконка успешной или неудачной регистрации" />
                <h2 className="modal__message">
                    {message}
                </h2>
                <button className="popup__close-btn" onClick={onClose}></button>
            </div>
        </div>
        )
}

export default Modal;