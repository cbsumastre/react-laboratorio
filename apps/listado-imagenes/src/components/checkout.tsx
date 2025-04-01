import React from "react";
import { ShopContext } from "../contexts/shopContext";
import { CartCard } from "./cart/cart-card";

interface Props {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}
export const Checkout: React.FC<Props> = (props) => { 
    const { isOpen, onConfirm, onCancel } = props
    
     const shopContext = React.useContext(ShopContext)

    if (!isOpen) return;

    return (
        <div className="modal-overlay-checkout">
            <div className="modal-content-checkout">
                <header>Carrito</header>
                <main>
                    {shopContext &&
                        shopContext.cartItems.map(id => <CartCard key={id} id={id} canRemove={false} />)}</main>
                <div className="modal-buttons">
                    <button onClick={onCancel} className="cancel-button">Cancelar</button>
                    <button onClick={onConfirm} className="confirm-button">Comprar</button>
                </div>
            </div>
        </div>
    );
}