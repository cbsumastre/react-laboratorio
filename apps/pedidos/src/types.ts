export enum OrderStatus {
    VALIDADO,
    INVALIDADO
}

export enum OrderDetailStatus {
    VALIDO,
    INVALIDO,
    PENDIENTE
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

export interface Order {
    id: string;
    supplier: Supplier;
    fecha: Date;
    importe: number;
    estado: OrderStatus;
    detalles: OrderDetail[]
}