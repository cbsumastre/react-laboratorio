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
    supplier?: Supplier;
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
        { id: '1', descripcion: 'Proveedor A' },
        { id: '2', descripcion: 'Proveedor B' },
        { id: '3', descripcion: 'Proveedor C' },
        { id: '4', descripcion: 'Proveedor D' },
    ]
};
