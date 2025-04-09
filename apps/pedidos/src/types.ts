export interface Proveedor {
  id: string;
  descripcion: string;
}

export interface PedidoCabecera {
  id: string;
  idProveedor?: string;
  fecha: string;
  importeTotal: number;
}

export interface Pedido {
  cabecera: PedidoCabecera;
  detalles: PedidoDetalle[];
  estado: EstadoPedido;
}

export enum EstadoPedido {
    VALIDADO = "Validado",
    PENDIENTE = "Pendiente",
    TERMINADO = "Terminado",
}

export enum EstadoPedidoDetalle {
  VALIDADO = "Validado",
  PENDIENTE = "Pendiente"
}


export interface PedidoDetalle {
  id: string;
  estado: EstadoPedidoDetalle;
  descripcion: string;
  importe: string;
  selected: boolean;
  descripcionError: boolean,
  importeError: boolean
}

