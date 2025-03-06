import React from "react";
import cart from "./assets/cart.svg"
import { ShopContext } from "./shopContext";
import { CartCard } from "./cart-card";


export const Cart: React.FC = () => {
    const shopContext = React.useContext(ShopContext)

    return (<div className="container-cart">
        <header>
            <img src={cart} alt="cart image" /> Carrito ({shopContext?.cartItems.length})
        </header>
        {shopContext?.cartItems && shopContext.cartItems.map(id => <CartCard key={id} id={id} />)}
    </div>)
}