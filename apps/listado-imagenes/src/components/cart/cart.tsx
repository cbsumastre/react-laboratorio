import React from "react";
import cart from "../../assets/cart.svg"
import { ShopContext } from "../../contexts/shopContext";
import { CartCard } from "./cart-card";
import { Modal } from "../modal";


export const Cart: React.FC = () => {
  const shopContext = React.useContext(ShopContext)
  const [isModalOpenCheckout, setIsModalOpenCheckout] = React.useState(false);
  const [isModalEmptyCart, setIsModalEmptyCart] = React.useState(false);

  const handleCheckout = () => {
    setIsModalOpenCheckout(true);
  }

  const handleEmpty = () => {
    setIsModalEmptyCart(true);
  }

  const handleConfirmarCompra = () => {
    setIsModalOpenCheckout(false);
    shopContext?.emptyCart()
    shopContext?.openCart(false)
  }
  const handleCancelCompra = () => {
    setIsModalOpenCheckout(false);
  }

  const handleConfirmarEmptyCart = () => {
    setIsModalEmptyCart(false);
    shopContext?.emptyCart()
    shopContext?.openCart(false)
  }
  const handleCancelEmptyCart = () => {
    setIsModalEmptyCart(false);
  }

  return (<div className={`container-cart ${shopContext?.isOpenCart ? 'opened' : ''}`}>
    <header>
      <img src={cart} alt="cart image" /> Carrito {shopContext && shopContext.cartItems.length > 0 && <span className="cart-count">({shopContext.cartItems.length})</span>}
    </header>
    <main>
      {
        shopContext && (shopContext.cartItems.length === 0 ?
          <p className="empty-cart">El carrito está vacío</p>
          :
          shopContext.cartItems.map(id => <CartCard key={id} id={id} />))
      }
    </main>

    {shopContext && shopContext.cartItems.length > 0 &&
      <span className="card-buttons ">
        <button className="cart-empty-button" onClick={() => { handleEmpty() }}>Vaciar</button> <button className="cart-checkout-button" onClick={() => { handleCheckout() }}>Checkout</button></span>}


    <Modal
      isOpen={isModalOpenCheckout}
      message='¿Confirmar la compra?'
      onConfirm={handleConfirmarCompra}
      onCancel={handleCancelCompra}
    />

    <Modal
      isOpen={isModalEmptyCart}
      message='¿Vaciar el carrito?'
      onConfirm={handleConfirmarEmptyCart}
      onCancel={handleCancelEmptyCart}
    />
  </div>)
}