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

    const [titular, setTitular] = React.useState("")
    const [numero, setNumero] = React.useState("")
    const [fechaCaducidad, setFechaCaducidad] = React.useState("")
    const [cvc, setCvc] = React.useState("")

    const reset = React.useCallback(()=>{
        setTitular("")
        setNumero("")
        setFechaCaducidad("")
        setCvc("")
    },[])

    const handleSubmit = (e: React.FormEvent) => {
        // aquí habría que realizar validaciones
        e.preventDefault()
        alert("Compra realizada con exito")
        reset();
        onConfirm()
    }

    const handleCancel = () => {
        reset();
        onCancel();
    }


    const shopContext = React.useContext(ShopContext)

    if (!isOpen) return;

    return (
        <div className="modal-overlay-checkout">
            <div className="modal-content-checkout">
                <div className="modal-header">
                    <h2>Checkout</h2>
                    <p className="header-description">Revisa los artículos y completa la compra</p>
                </div>
                <h2>Artículos</h2>
                <main>
                    {shopContext &&
                        shopContext.cartItems.map(id => <CartCard key={id} id={id} canRemove={false} />)}</main>
                <form className="container-pago" onSubmit={handleSubmit}>
                    <section className="section-pago">
                        <h3>Información de pago</h3>

                        <div className="group">
                            <label htmlFor="titular">Titular</label>
                            <input id="titular" type="text" placeholder="Titular de la cuenta" value={titular} required onChange={(e) => {
                                setTitular(e.target.value)
                            }} />
                        </div>

                        <div className="group">
                            <label htmlFor="numero">Número</label>
                            <input id="cardNumber" type="text" placeholder="1234 5678 9012 3456" required value={numero} onChange={(e) => {
                                setNumero(e.target.value)
                            }} />
                        </div>

                        <div className="row">
                            <div className="group">
                                <label htmlFor="fecha">Fecha de caducidad</label>
                                <input id="fecha" type="text" placeholder="MM/YY" required value={fechaCaducidad} onChange={(e) => {
                                    setFechaCaducidad(e.target.value)
                                }} />
                            </div>
                            <div className="group">
                                <label htmlFor="cvc">CVC</label>
                                <input id="cvc" type="text" placeholder="123" required value={cvc} onChange={(e) => {
                                    setCvc(e.target.value)
                                }} />
                            </div>
                        </div>
                    </section>

                    <div className="modal-footer modal-buttons">
                        <button type="button" className="cancel-button" onClick={handleCancel}>
                            Cancelar
                        </button>
                        <button type="submit" className="confirm-button">
                            Completar compra
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}