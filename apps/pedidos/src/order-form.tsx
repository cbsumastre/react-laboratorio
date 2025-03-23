import React from "react";

import "./styles/order-form.scss"
import { Supplier } from "./types";


const proveedores: Supplier[] = [
    { id: '1', descripcion: 'Proveedor A' },
    { id: '2', descripcion: 'Proveedor B' },
    { id: '3', descripcion: 'Proveedor C' },
    { id: '4', descripcion: 'Proveedor D' },
];


export const OrderForm: React.FC = () => {

    const [proveedorSeleccionado, setProveedorSeleccionado] = React.useState<Supplier>()

    const handleProveedorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const proveedorId = e.target.value;
        const proveedor = proveedores.find((p) => p.id === proveedorId);
        if (proveedor) {
            setProveedorSeleccionado(proveedor);
        }
    };

    return (
        <>
            <div className="order-form">
                <h2>Pedido a proveedor</h2>
                <div className="form-row">
                    <label>Número</label>
                    <input type="text" />
                </div>
                <div className="form-row">
                    <label>Proveedor</label>
                    <select value={proveedorSeleccionado?.id} onChange={handleProveedorChange}>
                        {proveedores.map((proveedor) => (
                            <option key={proveedor.id} value={proveedor.id}>
                                {proveedor.descripcion}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-row">
                    <label>Fecha</label>
                    <input type="date" />
                </div>
                <div className="form-row">
                    <label>Importe Total</label>
                    <input type="text" />
                </div>
                <div className="form-row">
                    <label>Estado</label>
                    <input type="text" />
                </div>
                <button className="disabled">Enviar</button>
            </div>
            <div>
                <div className="validation-buttons">
                    <button>Validar</button>
                    <button>Invalidar</button>
                </div>

            </div>
        </>
    );
}