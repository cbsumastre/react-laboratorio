import { OrderForm } from './order-form';
import OrderList from './order-list';
import { Order, OrderDetailStatus, OrderStatus } from './types';

import "./styles/app.scss"
import React from 'react';

const newOrder: Order = {
  cabecera: {
    id: "Pedido-1",
    fecha: new Date(),
    idSupplier: "P3"
  },
  estado: OrderStatus.INVALIDADO,
  detalles: [{ estado: OrderDetailStatus.PENDIENTE, descripcion: 'Reactivos maquinaria', importe: 234.45 },
  { estado: OrderDetailStatus.PENDIENTE, descripcion: 'Recambios impresión', importe: 130.10 },
  { estado: OrderDetailStatus.PENDIENTE, descripcion: 'Soportes plataforma', importe: 540.99 },],
  importe: 0
}

function App() {

  const [order, setOrder] = React.useState<Order>(newOrder);

  const enviar = () => {}

  // const orderItems = React.useState<OrderDetail[]>([
  //   { estado: OrderDetailStatus.PENDIENTE, descripcion: 'Reactivos maquinaria', importe: 234.45 },
  //   { estado: OrderDetailStatus.PENDIENTE, descripcion: 'Recambios impresión', importe: 130.10 },
  //   { estado: OrderDetailStatus.PENDIENTE, descripcion: 'Soportes plataforma', importe: 540.99 },
  // ]);

  // const items: OrderDetailSelected[] = orderItems.map((o: OrderDetail) => {
  //   return {
  //     ...o,
  //     selected: false
  //   }
  // })

  return (
    <div className="container-app">
      {order && order?.cabecera && <OrderForm enviar={enviar} estado={order.estado} header={order.cabecera} importeTotal={order.importe} />}
      {order && order?.detalles && <OrderList items={order.detalles} />}
    </div>
  )
}

export default App
