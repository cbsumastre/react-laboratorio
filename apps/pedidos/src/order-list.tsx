import React from 'react';
import { OrderItem } from './order-item';
import { OrderDetailSelected } from './types';

import "./styles/order-list.scss"


interface Props {
    items: OrderDetailSelected[]
}

export const OrderList: React.FC<Props> = ({ items }) => {
    return (
        <div className="order-list">
            <div className="order-header">
                <span><input type="checkbox"/></span>
                <span>Estado</span>
                <span>Descripción</span>
                <span>Importe</span>
            </div>
            {items.map((item, index) => (
                <OrderItem key={index} item={item} />
            ))}
        </div>
    );
}

export default OrderList;