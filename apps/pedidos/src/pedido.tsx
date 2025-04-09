import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from "@mui/icons-material/AddBox";


import { EstadoPedidoDetalle, PedidoDetalle } from './types';
import { PedidoContext } from './contexts/pedidoContext';
import { PedidoHeader } from './pedido-header';


export const Pedido: React.FC = () => {
  const pedidoContext = React.useContext(PedidoContext)

  const checkAll = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (checkAll.current) {
      checkAll.current.checked = false;
    }
  }, [pedidoContext?.pedido.estado])

  const isDescripcionConError = React.useCallback((detalle: PedidoDetalle) => {
    return !detalle.descripcion;
  }, []);

  const isImporteConError = React.useCallback((detalle: PedidoDetalle) => {
    return !detalle.importe || isNaN(Number(detalle.importe)) || Number(detalle.importe) <= 0;
  }, []);

  const handleChangeCheckDetalles = (checked: boolean) => {
    const newDetalles = pedidoContext?.pedido.detalles.map((detalle) => {
      return { ...detalle, selected: checked };
    })
    if (newDetalles) {
      pedidoContext?.setDetalles(newDetalles);
    }
  }

  const handleChangeSelectedDetalle = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const checked = e.target.checked;
    const newDetalles = pedidoContext?.pedido.detalles.map((detalle, i) => {
      if (i === index) {
        return { ...detalle, selected: checked }
      }
      return detalle
    })

    if (newDetalles) {
      pedidoContext?.setDetalles(newDetalles);
    }
  }

  const handleChangeImporteDetalle = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const inputValue = e.target.value;

    const newDetalles = pedidoContext?.pedido.detalles.map((detalle, i) => {
      if (i === index) {
        const updatedDetalle = { ...detalle, importe: inputValue };
        return { ...updatedDetalle, descripcionError: isDescripcionConError(updatedDetalle), importeError: isImporteConError(updatedDetalle) }
      }
      return detalle;
    })

    if (newDetalles) {
      pedidoContext?.setDetalles(newDetalles);
    }
  }


  const handleChangeDescripcion = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const inputValue = e.target.value;

    const newDetalles = pedidoContext?.pedido.detalles.map((detalle, i) => {
      if (i === index) {
        const updatedDetalle = { ...detalle, descripcion: inputValue };
        return { ...updatedDetalle, descripcionError: isDescripcionConError(updatedDetalle), importeError: isImporteConError(updatedDetalle) }
      }
      return detalle
    })
    if (newDetalles) {
      pedidoContext?.setDetalles(newDetalles);
    }
  }

  const handleRemoveDetalle = (id: string) => {
    pedidoContext?.removeDetalle(id)
  }

  const handleAddDetalle = () => {
    pedidoContext?.newDetalle()
  }

  return (
    <div className="container-app">
      <PedidoHeader />
      <div className="pedido-list">
        <div className="cabecera">
          <span>{!pedidoContext?.isTerminado() && <input type="checkbox" onChange={(e) => handleChangeCheckDetalles(e.target.checked)} ref={checkAll} />}</span>
          <span>Estado</span>
          <span>Descripción</span>
          <span>Importe</span>
          <span>{!pedidoContext?.isTerminado() && <AddBoxIcon onClick={handleAddDetalle} fontSize='small' />}</span>
        </div>
        {pedidoContext?.pedido.detalles.map((item, index) => (
          <div className="detalle" key={index}>
            <span>{!pedidoContext?.isTerminado() && <input type="checkbox" checked={item.selected} onChange={e => handleChangeSelectedDetalle(e, index)} />}</span>
            <span className="estado-detalle">{item.estado}</span>
            <span><input type="text" value={item.descripcion} onChange={(e) => handleChangeDescripcion(e, index)} className={item.descripcionError ? 'descripcion-detalle-error' : 'descripcion-detalle'} disabled={pedidoContext?.isTerminado() || item.estado === EstadoPedidoDetalle.VALIDADO} /></span>
            <span><input type="text" value={item.importe} onChange={(e) => handleChangeImporteDetalle(e, index)} className={item.importeError ? 'importe-detalle-error' : 'importe-detalle'} disabled={pedidoContext?.isTerminado() || item.estado === EstadoPedidoDetalle.VALIDADO} /></span>
            <span>{!pedidoContext?.isTerminado() && item.estado !== EstadoPedidoDetalle.VALIDADO && <DeleteIcon onClick={(_e) => handleRemoveDetalle(item.id)} fontSize='small' />}</span>
          </div>
        ))}
      </div>

    </div>)
}



