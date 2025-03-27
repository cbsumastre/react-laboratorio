import React from "react";

import "./styles/order-form.scss"

import { getProveedores, OrderHeader, OrderStatus, Supplier } from "./types";

interface Props {
    header: OrderHeader;
    importeTotal: number;
    estado: OrderStatus;
    enviar: () => void;
}



export const OrderForm: React.FC<Props> = (props) => {

    const { header, importeTotal, estado, enviar } = props;

    const [proveedorSeleccionado, setProveedorSeleccionado] = React.useState<Supplier>()

    const handleProveedorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const proveedorId = e.target.value;
        const proveedor = getProveedores().find((p) => p.id === proveedorId);
        if (proveedor) {
            setProveedorSeleccionado(proveedor);
        }
    };

    function handleEnviar(): void {
        enviar()
    }

    const handleOnChangeNumeroPedido = (e: React.ChangeEvent<HTMLInputElement>) => {
        header.id = e.target.value
        console.log(e.target.value)
    }

    const handleOnChangeDate = () => {

    }

    return (
        <header>
            <div className="order-form">
                <h2>Pedido a proveedor</h2>
                <div className="form-row">
                    <label>Número</label>
                    <input type="text" className="numero-pedido" value={header.id} onChange={e => handleOnChangeNumeroPedido(e)} />
                    <label>Proveedor</label>
                    <select value={proveedorSeleccionado?.id} onChange={handleProveedorChange} className="proveedor">
                        {getProveedores().map((proveedor) => (
                            <option key={proveedor.id} value={proveedor.id}>
                                {proveedor.descripcion}
                            </option>
                        ))}
                    </select>
                    <label>Fecha</label>
                    <input type="date" className="fecha" onChange={handleOnChangeDate} />
                </div>
                <div className="form-row">
                    <label>Importe Total</label>
                    <input type="text" className="importe-total" value={importeTotal} disabled />
                    <label>Estado</label>
                    <input type="text" value={estado} disabled />
                </div>
                <span className="enviar">
                    <button className="disabled" onClick={handleEnviar}>Enviar</button>
                </span>
            </div>

            <div className="validation-buttons">
                <button className="enabled">Validar</button>
                <button className="enabled">Invalidar</button>
            </div>


        </header>
    );
}