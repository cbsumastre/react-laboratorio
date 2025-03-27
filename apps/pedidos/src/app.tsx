import React from 'react'

enum EstadoPedido {
  VALIDADO = "Validado",
  INVALIDADO = "Invalidado"
}

enum EstadoDetallePedido {
  VALIDO = "Valido",
  INVALIDO = "Invalido",
  PENDIENTE = "Pendiente"
}


interface DetallePedido {
  estado: EstadoDetallePedido;
  descripcion: string;
  importe: string;
  selected: boolean;
}


interface Proveedor {
  id: string;
  descripcion: string;
}


const getProveedores = (): Proveedor[] => {
  return [
    { id: 'P1', descripcion: 'Proveedor A' },
    { id: 'P2', descripcion: 'Proveedor B' },
    { id: 'P3', descripcion: 'Proveedor C' },
    { id: 'P4', descripcion: 'Proveedor D' },
  ]
};

const detallesIni: DetallePedido[] = [{ estado: EstadoDetallePedido.PENDIENTE, descripcion: 'Reactivos maquinaria', importe: "234.45", selected: false },
{ estado: EstadoDetallePedido.PENDIENTE, descripcion: 'Recambios impresión', importe: "130.10", selected: false },
{ estado: EstadoDetallePedido.PENDIENTE, descripcion: 'Soportes plataforma', importe: "540.99", selected: false }];

const regex = /^\d*\.?\d*$/; // Expresión regular para números y decimales

export const App: React.FC = () => {

  const [idPedido, setIdPedido] = React.useState<string>("")
  const [idProveedor, setIdProveedor] = React.useState<string>("")
  const [fechaPedido, setFechaPedido] = React.useState<string>("")
  const [importeTotal, setImporteTotal] = React.useState<number>(0)
  const [estado, setEstado] = React.useState<EstadoDetallePedido>(EstadoDetallePedido.PENDIENTE)
  const [detalles, setDetalles] = React.useState<DetallePedido[]>([])

  const [disabledEnviar, setDisabledEnviar] = React.useState<boolean>(true)
  const [disabledValidar, setDisabledValidar] = React.useState<boolean>(true)
  const [disabledInvalidar, setDisabledInvalidar] = React.useState<boolean>(true)

  React.useEffect(() => {
    setDetalles(detallesIni)
  }, [])

  React.useEffect(() => {
    let impTotal = 0;
    detalles.forEach(detalle => {
      impTotal += Number(detalle.importe)
    })
    setImporteTotal(impTotal)
  }, [detalles])


  const handleChangeNumeroPedido = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setIdPedido(e.target.value);
  };

  const handleChangeProveedor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    setIdProveedor(e.target.value)
  };

  const handleChangeFechaPedido = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setFechaPedido(e.target.value)
  };

  const handleEnviar = () => {

  }

  const handleValidar = () => {

  }

  const handleInvalidar = () => {

  }

  const handleChangeCheckDetalles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const newDetalles = detalles.map((detalle) => {
      return { ...detalle, selected: checked }
    })
    setDetalles(newDetalles)
  }

  const handleChangeSelectedDetalle = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const checked = e.target.checked;
    const newDetalles = detalles.map((detalle, i) => {
      if (i === index) {
        return { ...detalle, selected: checked }
      }
      return detalle
    })

    setDetalles(newDetalles)
  }

  const handleChangeImporteDetalle = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const inputValue = e.target.value;

    const newDetalles = detalles.map((detalle, i) => {
      if (i === index) {
        if (inputValue === '' || regex.test(inputValue)) {
          return { ...detalle, importe: inputValue }
        }
      }
      return detalle
    })

    setDetalles(newDetalles)
  }


  const handleChangeDescripcion = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const inputValue = e.target.value;

    const newDetalles = detalles.map((detalle, i) => {
      if (i === index) {
        return { ...detalle, descripcion: inputValue }
      }
      return detalle
    })
    setDetalles(newDetalles)
  }

  const handleAddDetalle = () => {
    const newDetalles = [...detalles]
    newDetalles.push({
      estado: EstadoDetallePedido.PENDIENTE,
      descripcion: "",
      importe: "0",
      selected: false
    })
    setDetalles(newDetalles)
  }



  return (
    <div className="container-app">
      <header>
        <div className="order-form">
          <h2>Pedido a proveedor</h2>
          <div className="form-row">
            <label>Número</label>
            <input type="text" className="numero-pedido" value={idPedido} onChange={handleChangeNumeroPedido} />
            <label>Proveedor</label>
            <select value={idProveedor} onChange={handleChangeProveedor} className="proveedor">
              {getProveedores().map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.descripcion}
                </option>
              ))}
            </select>
            <label>Fecha</label>
            <input type="date" value={fechaPedido} className="fecha" onChange={handleChangeFechaPedido} />
          </div>
          <div className="form-row">
            <label>Importe Total</label>
            <input type="text" className="importe-total" value={importeTotal} disabled />
            <label>Estado</label>
            <input type="text" value={estado} disabled />
          </div>
          <span className="enviar">
            <button className={disabledEnviar ? 'disabled' : ''} onClick={handleEnviar} disabled={disabledEnviar}>Enviar</button>
          </span>
        </div>

        <div className="validation-buttons">
          <button className={disabledValidar ? 'disabled' : ''} disabled={disabledValidar} onClick={handleValidar}>Validar</button>
          <button className={disabledInvalidar ? 'disabled' : ''} disabled={disabledInvalidar} onClick={handleInvalidar}>Invalidar</button>
          <button onClick={handleAddDetalle}>+</button>
        </div>
      </header>

      <div className="order-list">
        <div className="order-header">
          <span><input type="checkbox" onChange={handleChangeCheckDetalles} /></span>
          <span>Estado</span>
          <span>Descripción</span>
          <span>Importe</span>
        </div>
        {detalles.map((item, index) => (
          <div className="order-item" key={index}>
            <span><input type="checkbox" checked={item.selected} onChange={e => handleChangeSelectedDetalle(e, index)} /></span>
            <span className="estado-detalle">{item.estado}</span>
            <span><input type="text" value={item.descripcion} onChange={(e) => handleChangeDescripcion(e, index)} className="descripcion-detalle" /></span>
            <span><input type="text" value={item.importe} onChange={(e) => handleChangeImporteDetalle(e, index)} className='importe-detalle' /></span>
          </div>
        ))}
      </div>

    </div>
  )
}

