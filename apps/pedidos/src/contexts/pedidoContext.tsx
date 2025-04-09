import React from "react";

import { EstadoPedido, EstadoPedidoDetalle, Pedido, PedidoCabecera, PedidoDetalle } from "../types";
import { initialState, pedidoReduce } from "../pedidoReduce";

interface PedidoContextType {
    pedido: Pedido;
    porcentajeEstado: number;
    isTerminado: () => boolean;
    isAnyDetallesConError: () => boolean;
    isAnyDetallesSelectedConError: () => boolean;
    isAnyDetallesSelected: () => boolean;
    setCabecera: (newCabecera: PedidoCabecera) => void;
    setEstado: (newEstado: EstadoPedido) => void;
    newPedido: () => void;
    newDetalle: () => void;
    setDetalles: (detalles: PedidoDetalle[]) => void;
    removeDetalle: (id: string) => void;

}

export const PedidoContext = React.createContext<PedidoContextType | undefined>(undefined)

interface Props {
    children: React.ReactNode;
}

export const PedidoProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = React.useReducer(pedidoReduce, initialState());
    const { pedido, porcentajeEstado } = state;

    const calculaImporteTotal = React.useCallback((): number => {
        let importeTotal = 0;
        pedido.detalles?.forEach(detalle => {
            if (!isNaN(parseInt(detalle.importe))) {
                importeTotal += Number(detalle.importe);
            }
        });
        return Number(importeTotal.toFixed(2));
    }, [pedido.detalles]);

    const calculaEstadoPedido = React.useCallback((): EstadoPedido => {
        let estadoPedido: EstadoPedido = EstadoPedido.PENDIENTE;
        const numEstadosMap = new Map<EstadoPedidoDetalle, number>();
        if (pedido.detalles.length > 0) {
            pedido.detalles.forEach(detalle => {
                const n = numEstadosMap.get(detalle.estado) ?? 0;
                numEstadosMap.set(detalle.estado, n + 1);
            });
            estadoPedido = numEstadosMap.get(EstadoPedidoDetalle.VALIDADO) === pedido.detalles.length ? EstadoPedido.VALIDADO : EstadoPedido.PENDIENTE;
        }
        return estadoPedido;
    }, [pedido.detalles]);

    const calculaPorcentajeCompletado = React.useCallback((): number => {
        let porcentajeCompletado = 0;
        if (pedido.detalles) {
            porcentajeCompletado = pedido.detalles.length === 0 ? 0 : Math.round((pedido.detalles.filter(detalle => detalle.estado === EstadoPedidoDetalle.VALIDADO).length / pedido.detalles.length) * 100);
        }
        dispatch({ type: "UPDATE_PORCENTAJE_ESTADO", payload: porcentajeCompletado });
        return porcentajeCompletado;
    }, [pedido.detalles, dispatch]);

    React.useEffect(() => {
        const importeTotal = calculaImporteTotal();
        const estadoPedido = calculaEstadoPedido();
        const newCabecera = { ...pedido.cabecera, importeTotal };
        dispatch({ type: "UPDATE_PEDIDO", payload: { ...state.pedido, estado: estadoPedido, cabecera: newCabecera } });
        calculaPorcentajeCompletado();
    }, [state.pedido.detalles, calculaImporteTotal, calculaEstadoPedido, calculaPorcentajeCompletado, state.pedido.cabecera.importeTotal]);

    const setCabecera = React.useCallback((newCabecera: PedidoCabecera) => {
        dispatch({ type: "SET_CABECERA", payload: newCabecera });
    }, [dispatch]);

    const setEstado = React.useCallback((newEstado: EstadoPedido) => {
        dispatch({ type: "SET_ESTADO", payload: newEstado });
    }, [dispatch]);

    const newPedido = React.useCallback(()=>{
        dispatch({type:"NEW_PEDIDO"})
    },[dispatch])

    const newDetalle = React.useCallback(() => {
        dispatch({ type: "NEW_DETALLE" });
    }, [dispatch]);

    const setDetalles = React.useCallback((detalles: PedidoDetalle[]) => {
        dispatch({ type: "SET_DETALLES", payload: detalles });
    }, [dispatch]);

    const removeDetalle = React.useCallback((id: string) => {
        dispatch({ type: "REMOVE_DETALLE", payload: id });
    }, [dispatch]);

    const isTerminado = React.useCallback(() => pedido.estado === EstadoPedido.TERMINADO, [pedido.estado]);

    const isAnyDetallesSelected = React.useCallback(() => pedido.detalles.filter(detalle => detalle.selected).length > 0, [pedido.detalles]);

    const isAnyDetallesConError = React.useCallback(() => pedido.detalles.filter(detalle => detalle.descripcionError || detalle.importeError).length > 0, [pedido.detalles]);

    const isAnyDetallesSelectedConError = React.useCallback(()=> pedido.detalles.filter(detalle => detalle.selected && (detalle.descripcionError || detalle.importeError)).length > 0, [pedido.detalles]);

    const contextValue: PedidoContextType = {
        pedido,
        porcentajeEstado,
        isTerminado,
        isAnyDetallesSelected,
        isAnyDetallesConError,
        isAnyDetallesSelectedConError,
        setEstado,
        setCabecera,
        newPedido,
        newDetalle,
        setDetalles,
        removeDetalle
    };

    return (
        <PedidoContext.Provider value={contextValue}>
            {children}
        </PedidoContext.Provider>
    );
};