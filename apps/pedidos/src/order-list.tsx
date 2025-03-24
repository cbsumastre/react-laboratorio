import React from 'react';
import { OrderItem } from './order-item';
import { OrderDetail } from './types';

import "./styles/order-list.scss"


interface Props {
    items: OrderDetail[]
}

const itemSelected = (item: OrderDetail) => {
    return {
        ...item,
        selected: false
    }
}

export const OrderList: React.FC<Props> = ({ items }) => {
    return (
        <div className="order-list">
            <div className="order-header">
                <span><input type="checkbox" /></span>
                <span>Estado</span>
                <span>Descripción</span>
                <span>Importe</span>
            </div>
            {items.map((item, index) => (
                <OrderItem key={index} item={itemSelected(item)} />
            ))}
        </div>
    );
}

export default OrderList;