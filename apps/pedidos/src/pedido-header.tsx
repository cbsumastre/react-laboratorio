import React from 'react';

import { getProveedorById, getProveedores } from './services/proveedores';
import { PedidoContext } from './contexts/pedidoContext';
import { EstadoPedido, EstadoPedidoDetalle } from './types';

export const PedidoHeader: React.FC = () => {

  const pedidoContext = React.useContext(PedidoContext)
  const [idError, setIdError] = React.useState<string | null>(null);
  const [proveedorIdError, setProveedorIdError] = React.useState<string | null>(null);
  const [fechaError, setFechaError] = React.useState<string | null>(null);

  const handleChangeNumeroPedido = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    pedidoContext?.setCabecera({
      ...pedidoContext.pedido.cabecera,
      id: e.target.value
    })

    if (!e.target.value.trim()) {
      setIdError("El número de pedido al proveedor es obligatorio.");
    } else {
      setIdError(null);
    }
  };

  const handleChangeProveedor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    pedidoContext?.setCabecera({
      ...pedidoContext.pedido.cabecera,
      idProveedor: e.target.value
    })

    if (!e.target.value) {
      setProveedorIdError("Tienes que seleccionar un proveedor.");
    } else {
      setProveedorIdError(null);
    }
  };

  const handleChangeFechaPedido = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    pedidoContext?.setCabecera({
      ...pedidoContext.pedido.cabecera,
      fecha: e.target.value
    })
    if (!e.target.value) {
      setFechaError("Tienes que seleccionar una fecha.");
    } else {
      const selectedDate = new Date(e.target.value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      if (selectedDate < currentDate) {
        setFechaError("Fecha incorrecta. La fecha no puede ser anterior al día de hoy.");
      } else {
        setFechaError(null);
      }
    }
  };

  const handleEnviar = () => {
    if (!pedidoContext) {
      return;
    }
    let errores = false;
    const cabecera = pedidoContext.pedido.cabecera;

    if (cabecera.id.trim().length == 0) {
      setIdError("El número de pedido al proveedor es obligatorio.");
      errores = true;
    }

    if (!cabecera.idProveedor) {
      setProveedorIdError("Tienes que seleccionar un proveedor.");
      errores = true;
    }

    if (!cabecera.fecha) {
      setFechaError("Tienes que seleccionar una fecha.");
      errores = true;
    }
    else {
      const selectedDate = new Date(cabecera.fecha);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      if (selectedDate < currentDate) {
        setFechaError("Fecha incorrecta. La fecha no puede ser anterior al día de hoy.");
        errores = true;
      }
    }

    if (!errores && !pedidoContext.isAnyDetallesConError()) {
      const { id, idProveedor, importeTotal } = pedidoContext.pedido.cabecera
      const message = `Pedido ${id} realizado con exito al proveedor ${getProveedorById(idProveedor!)?.descripcion} por un importe de ${importeTotal} euros.`
      alert(message)
      pedidoContext.setEstado(EstadoPedido.TERMINADO);
    }
  }

  const handleValidar = () => {
    if (!pedidoContext) {
      return;
    }
    if (pedidoContext.isAnyDetallesSelected() && !pedidoContext.isAnyDetallesSelectedConError()) {
      changeEstadoPedidoDetalle(EstadoPedidoDetalle.VALIDADO);
    }
  }

  const handleInvalidar = () => {
    if (!pedidoContext) {
      return;
    }
    if (pedidoContext.isAnyDetallesSelected() && !pedidoContext.isAnyDetallesSelectedConError()) {
      changeEstadoPedidoDetalle(EstadoPedidoDetalle.PENDIENTE);
    }
  }

  const changeEstadoPedidoDetalle = (newEstado: EstadoPedidoDetalle) => {
    if (!pedidoContext) {
      return;
    }

    const newDetalles = pedidoContext.pedido.detalles.map((detalle) => {
      if (detalle.selected) {
        return {
          ...detalle,
          estado: newEstado,
          selected: false
        }
      }
      return detalle;
    });
    if (newDetalles) {
      pedidoContext.setDetalles(newDetalles);
    }
  }

  const handleNuevoPedido = () => {
    console.log("handleNuevoPedido")
    if (!pedidoContext) {
      return;
    }
    pedidoContext.newPedido();
  }


  return (
    <header>
      <div className="pedido-form">
        <button onClick={handleNuevoPedido} className="enabled">Nuevo pedido</button>
        <h2>Pedido a proveedor</h2>
        <div className="form-row">
          <label>Número</label>
          <input type="text" className={`numero-pedido ${idError ? 'error-form' : ''}`} value={pedidoContext?.pedido.cabecera.id} onChange={handleChangeNumeroPedido} disabled={pedidoContext?.isTerminado()} />

          <label>Proveedor</label>
          <select value={pedidoContext?.pedido.cabecera.idProveedor} onChange={handleChangeProveedor} className={`proveedor ${proveedorIdError ? 'error-form' : ''}`} disabled={pedidoContext?.isTerminado()}>
            <option value="">-- Selecciona un proveedor --</option>
            {getProveedores().map((proveedor) => (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.descripcion}
              </option>
            ))}
          </select>
          <label>Fecha</label>
          <input type="date" value={pedidoContext?.pedido.cabecera.fecha} className={`fecha ${fechaError ? 'error-form' : ''}`} onChange={handleChangeFechaPedido} disabled={pedidoContext?.isTerminado()} />

        </div>
        <div className="form-row">
          <label>Importe Total</label>
          <input type="text" className="importe-total" value={`${pedidoContext?.pedido.cabecera.importeTotal} €`} disabled />
          <label>Estado</label>
          <input type="text" value={`${pedidoContext?.porcentajeEstado} %`} disabled className='porcentaje-estado' />
        </div>
        {!pedidoContext?.isTerminado() && <span className="enviar">
          <button className={pedidoContext?.porcentajeEstado != 100 ? 'disabled' : 'enabled'} onClick={handleEnviar} disabled={pedidoContext?.porcentajeEstado != 100}>Enviar</button>
        </span>}
        {(idError || proveedorIdError || fechaError) && <span>
          {idError && <span className="error-message">{idError}</span>}
          {proveedorIdError && <span className="error-message">{proveedorIdError}</span>}
          {fechaError && <span className="error-message">{fechaError}</span>}</span>}
      </div>

      {!pedidoContext?.isTerminado() && <div className="validation-buttons">
        {pedidoContext?.pedido.detalles && pedidoContext.pedido.detalles.length > 0 && <button className={pedidoContext?.isAnyDetallesSelected() ? 'enabled' : 'disabled'} onClick={handleValidar}>Validar</button>}
        {pedidoContext?.pedido.detalles && pedidoContext.pedido.detalles.length > 0 && <button className={pedidoContext?.isAnyDetallesSelected() ? 'enabled' : 'disabled'} onClick={handleInvalidar}>Invalidar</button>}
      </div>}
    </header>

  )

}