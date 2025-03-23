import { OrderForm } from './order-form';
import OrderList from './order-list';
import { OrderDetail, OrderDetailSelected, OrderDetailStatus } from './types';

import "./styles/app.scss"

function App() {

  const orderItems: OrderDetail[] = [
    { estado: OrderDetailStatus.PENDIENTE, descripcion: 'Reactivos maquinaria', importe: 234.45 },
    { estado: OrderDetailStatus.PENDIENTE, descripcion: 'Recambios impresión', importe: 130.10 },
    { estado: OrderDetailStatus.PENDIENTE, descripcion: 'Soportes plataforma', importe: 540.99 },
  ];

  const items: OrderDetailSelected[] = orderItems.map((o: OrderDetail) => {
    return {
      ...o,
      selected: false
    }
  })

  return (
    <div className="container-app">
      <OrderForm />
      <OrderList items={items} />
    </div>
  )
}

export default App
