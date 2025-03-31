import React from 'react';

import { getProveedores } from './services/proveedores';
import { PedidoContext } from './contexts/pedidoContext';
import { EstadoPedido, EstadoPedidoDetalle } from './types';

export const PedidoHeader: React.FC = () => {
    
    const pedidoContext=React.useContext(PedidoContext)

    
    
      
      

    const handleChangeNumeroPedido = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        pedidoContext?.setCabecera({
          ...pedidoContext.pedido.cabecera,
          id: e.target.value
        })
      };
    
      const handleChangeProveedor = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e);
        pedidoContext?.setCabecera({
          ...pedidoContext.pedido.cabecera,
          idProveedor: e.target.value
        })
      };
    
      const handleChangeFechaPedido = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        pedidoContext?.setCabecera({
          ...pedidoContext.pedido.cabecera,
          fecha: e.target.value
        })
      };
    
      const handleEnviar = () => {
        pedidoContext?.setEstado(EstadoPedido.TERMINADO);
      }

      const handleValidar = () => {
        changeEstadoPedido(EstadoPedidoDetalle.VALIDADO);
      }
    
      const handleInvalidar = () => {
        changeEstadoPedido(EstadoPedidoDetalle.PENDIENTE);
      }

      const changeEstadoPedido = (newEstado: EstadoPedidoDetalle) => {
        const newDetalles = pedidoContext?.pedido.detalles.map((detalle) => {
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
          pedidoContext?.setDetalles(newDetalles);
        }
      }
    

    return (
        <header>
            <div className="pedido-form">
                <h2>Pedido a proveedor</h2>
                <div className="form-row">
                    <label>Número</label>
                    <input type="text" className="numero-pedido" value={pedidoContext?.pedido.cabecera.id} onChange={handleChangeNumeroPedido} />
                    <label>Proveedor</label>
                    <select value={pedidoContext?.pedido.cabecera.idProveedor} onChange={handleChangeProveedor} className="proveedor">
                        {getProveedores().map((proveedor) => (
                            <option key={proveedor.id} value={proveedor.id}>
                                {proveedor.descripcion}
                            </option>
                        ))}
                    </select>
                    <label>Fecha</label>
                    <input type="date" value={pedidoContext?.pedido.cabecera.fecha} className="fecha" onChange={handleChangeFechaPedido} />
                </div>
                <div className="form-row">
                    <label>Importe Total</label>
                    <input type="text" className="importe-total" value={pedidoContext?.pedido.cabecera.importeTotal} disabled />
                    <label>Estado</label>
                    <input type="text" value={`${pedidoContext?.porcentajeEstado} %`} disabled className='porcentaje-estado' />
                </div>
                {pedidoContext?.pedido.estado !== EstadoPedido.TERMINADO && <span className="enviar">
                    <button className={pedidoContext?.porcentajeEstado != 100 ? 'disabled' : 'enabled'} onClick={handleEnviar} disabled={pedidoContext?.porcentajeEstado != 100}>Enviar</button>
                </span>}
            </div>


            {pedidoContext?.pedido.estado !== EstadoPedido.TERMINADO && <div className="validation-buttons">
                {pedidoContext?.pedido.detalles && pedidoContext.pedido.detalles.length > 0 && <button className={'enabled'} onClick={handleValidar}>Validar</button>}
                {pedidoContext?.pedido.detalles && pedidoContext.pedido.detalles.length > 0 && <button className={'enabled'} onClick={handleInvalidar}>Invalidar</button>}
            </div>}
        </header>

    )

}