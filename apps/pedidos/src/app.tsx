import { OrderForm } from './order-form';
import OrderList from './order-list';
import { Order, OrderStatus } from './types';

import "./styles/app.scss"
import React from 'react';

function App() {

  const [order,setOrder] = React.useState<Order>();

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
      {order && order?.cabecera && <OrderForm enviar={()=>{}} estado={OrderStatus.INVALIDADO} header={order.cabecera} importeTotal={0}/>}
      {order && order?.detalles && <OrderList items={order.detalles} />}
    </div>
  )
}

export default App
