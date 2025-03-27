export enum OrderStatus {
    VALIDADO = "Validado",
    INVALIDADO = "Invalidado"
}

export enum OrderDetailStatus {
    VALIDO = "Valido",
    INVALIDO = "Invalido",
    PENDIENTE = "Pendiente"
}

export interface OrderDetail {
    descripcion: string;
    estado: OrderDetailStatus;
    importe: number;
}

export interface OrderDetailSelected extends OrderDetail {
    selected: boolean;
}

export interface Supplier {
    id: string;
    descripcion: string;
}

export interface OrderHeader {
    id: string;
    idSupplier: string;
    fecha: Date;
}

export interface Order {
    cabecera?: OrderHeader;
    importe: number;
    estado: OrderStatus;
    detalles: OrderDetail[]
}


export const getProveedores = (): Supplier[] => {
    return [
        { id: 'P1', descripcion: 'Proveedor A' },
        { id: 'P2', descripcion: 'Proveedor B' },
        { id: 'P3', descripcion: 'Proveedor C' },
        { id: 'P4', descripcion: 'Proveedor D' },
    ]
};
