import React from "react";

interface Props {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const Modal: React.FC<Props> = (props) => {
    const { isOpen, message, onConfirm, onCancel } = props

    if (!isOpen) return;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={onCancel} className="cancel-button">Cancelar</button>
                    <button onClick={onConfirm} className="confirm-button">Confirmar</button>
                </div>
            </div>
        </div>
    );

}