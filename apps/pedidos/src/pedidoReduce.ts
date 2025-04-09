import { EstadoPedido, EstadoPedidoDetalle, Pedido, PedidoCabecera, PedidoDetalle } from "./types";
import { randomId } from "./services/uuid";

interface State {
    pedido: Pedido;
    porcentajeEstado: number;
}


export const initialState = ():State => {
    return {
    pedido: {
        cabecera: {
            id: `P-${randomId()}`,
            fecha: new Date().toISOString().split("T")[0],
            importeTotal: 0,
            idProveedor:""
        },
        detalles: [],
        estado: EstadoPedido.PENDIENTE
    },
    porcentajeEstado: 0
}
}

type Action =
     { type: "NEW_PEDIDO" } |
    { type: "SET_CABECERA"; payload: PedidoCabecera } |
    { type: "SET_ESTADO"; payload: EstadoPedido }
    | { type: "NEW_DETALLE" }
    | { type: "SET_DETALLES"; payload: PedidoDetalle[] }
    | { type: "REMOVE_DETALLE"; payload: string }
    | { type: "UPDATE_PORCENTAJE_ESTADO"; payload: number }
    | { type: "UPDATE_PEDIDO"; payload: Pedido }


export const pedidoReduce = (state: State, action: Action): State => {
    switch (action.type) {
        case "NEW_PEDIDO": {
            const newPedido=initialState()
            return {
                ...state,
               pedido: newPedido.pedido,
               porcentajeEstado: newPedido.porcentajeEstado
            }
        }
        case "SET_CABECERA":
            return {
                ...state,
                pedido: { ...state.pedido, cabecera: action.payload },
            };
        case "SET_ESTADO":
            return {
                ...state,
                pedido: { ...state.pedido, estado: action.payload },
            };
        case "NEW_DETALLE":
            const newDetalle: PedidoDetalle = {
                id: `D-${randomId()}`,
                estado: EstadoPedidoDetalle.PENDIENTE,
                descripcion: "",
                importe: "0",
                selected: false,
                descripcionError: false,
                importeError: false
            };
            return {
                ...state,
                pedido: { ...state.pedido, detalles: [newDetalle, ...state.pedido.detalles] },
            };
        case "SET_DETALLES":
            return {
                ...state,
                pedido: { ...state.pedido, detalles: action.payload },
            };
        case "REMOVE_DETALLE":
            return {
                ...state,
                pedido: { ...state.pedido, detalles: state.pedido.detalles.filter(p => p.id !== action.payload) },
            };
        case "UPDATE_PORCENTAJE_ESTADO":
            return {
                ...state,
                porcentajeEstado: action.payload,
            };
        case "UPDATE_PEDIDO":
            return {
                ...state,
                pedido: action.payload,
            };
        default:
            return state;
    }
}
