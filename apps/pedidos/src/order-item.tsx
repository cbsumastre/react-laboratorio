import React from "react";
import { OrderDetailSelected } from "./types";

import "./styles/order-item.scss"

interface Props {
    item: OrderDetailSelected;
}


export const OrderItem:React.FC<Props> = ({ item }) => {
    return (
      <div className="order-item">
        <span><input type="checkbox" checked={item.selected}/></span>
        <span>{item.estado}</span>
        <span>{item.descripcion}</span>
        <span>{item.importe}</span>
      </div>
    );
  }