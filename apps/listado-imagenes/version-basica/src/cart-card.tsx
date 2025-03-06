import React from "react";

import { getInfo } from "./api";
import { ShopContext } from "./shopContext";
import trashIcon from "./assets/trash.svg"

interface Props {
    id: string;
}

export const CartCard: React.FC<Props> = ({ id }) => {
    const shopContext = React.useContext(ShopContext);

    const { name, pic_url } = getInfo(id)

    return (<div className="cart-card">
        <img src={pic_url} className="cart-card-info" title={name} alt={name} />
        <img src={trashIcon} alt="trash icon" onClick={() => { shopContext?.removeToCart(id) }} className="trash-icon" title="Quitar del carrito" />
    </div>)
}