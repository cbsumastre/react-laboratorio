import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from "@mui/icons-material/AddBox";


import {  EstadoPedido } from './types';
import { PedidoContext } from './contexts/pedidoContext';
import { PedidoHeader } from './pedido-header';


const regex = /^\d*\.?\d*$/; // Expresión regular para números y decimales

export const Pedido: React.FC = () => {
  const pedidoContext = React.useContext(PedidoContext)

  const checkAll = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (checkAll.current) {
      checkAll.current.checked = false;
    }
  }, [pedidoContext?.pedido.estado])

  const handleChangeCheckDetalles = (checked: boolean) => {
    const newDetalles = pedidoContext?.pedido.detalles.map((detalle) => {
      return { ...detalle, selected: checked }
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
        if (inputValue === '' || regex.test(inputValue)) {
          return { ...detalle, importe: inputValue }
        }
      }
      return detalle
    })

    if (newDetalles) {
      pedidoContext?.setDetalles(newDetalles);
    }
  }


  const handleChangeDescripcion = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const inputValue = e.target.value;

    const newDetalles = pedidoContext?.pedido.detalles.map((detalle, i) => {
      if (i === index) {
        return { ...detalle, descripcion: inputValue }
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
      <PedidoHeader/>
      <div className="pedido-list">
        <div className="cabecera">
          <span>{pedidoContext?.pedido.estado !== EstadoPedido.TERMINADO && <input type="checkbox" onChange={(e) => handleChangeCheckDetalles(e.target.checked)} ref={checkAll} />}</span>
          <span>Estado</span>
          <span>Descripción</span>
          <span>Importe</span>
          <span><AddBoxIcon onClick={handleAddDetalle} fontSize='small'/></span>
        </div>
        {pedidoContext?.pedido.detalles.map((item, index) => (
          <div className="detalle" key={index}>
            <span>{pedidoContext?.pedido.estado !== EstadoPedido.TERMINADO && <input type="checkbox" checked={item.selected} onChange={e => handleChangeSelectedDetalle(e, index)} />}</span>
            <span className="estado-detalle">{item.estado}</span>
            <span><input type="text" value={item.descripcion} onChange={(e) => handleChangeDescripcion(e, index)} className="descripcion-detalle" /></span>
            <span><input type="text" value={item.importe} onChange={(e) => handleChangeImporteDetalle(e, index)} className='importe-detalle' /></span>
            <span>{pedidoContext?.pedido.estado !== EstadoPedido.TERMINADO && <DeleteIcon onClick={(_e) => handleRemoveDetalle(item.id)} fontSize='small'/>}</span>
          </div>
        ))}
      </div>

    </div>)
}



