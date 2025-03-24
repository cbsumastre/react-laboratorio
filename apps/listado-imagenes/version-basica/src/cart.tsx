import React from "react";
import cart from "./assets/cart.svg"
import { ShopContext } from "./shopContext";
import { CartCard } from "./cart-card";


export const Cart: React.FC = () => {
  const shopContext = React.useContext(ShopContext)

  const handleEmpty = () => {
    shopContext?.emptyCart()
    shopContext?.openCart(false)
  }

  const handleCheckout = () => {

  }

  return (<div className={`container-cart ${shopContext?.isOpenCart ? 'opened' : ''}`}>
    <header>
      <img src={cart} alt="cart image" /> Carrito {shopContext && shopContext.cartItems.length > 0 && <span className="cart-count">({shopContext.cartItems.length})</span>}
    </header>
    {
      shopContext && (shopContext.cartItems.length === 0 ?
        <p className="empty-cart">El carrito está vacío</p>
        :
        shopContext.cartItems.map(id => <CartCard key={id} id={id} />))
    }
    {shopContext && shopContext.cartItems.length > 0 &&
      <span className="card-buttons ">
        <button className="cart-empty-button" onClick={() => { handleEmpty() }}>Vaciar</button> <button className="cart-checkout-button" onClick={() => { handleCheckout() }}>Checkout</button></span>}
  </div>)
}