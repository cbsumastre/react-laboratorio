import React from "react";
import { randomId } from "../services/uuid";
import { EstadoPedido, EstadoPedidoDetalle, Pedido, PedidoCabecera, PedidoDetalle } from "../types";


interface PedidoContextType {
    pedido: Pedido,
    porcentajeEstado: number,
    isTerminado: () => boolean,
    isAnyDetallesSelected: () => boolean,
    setCabecera: (newCabecera: PedidoCabecera) => void;
    setEstado: (newEstado: EstadoPedido) => void;
    newDetalle: () => void;
    setDetalles: (detalles: PedidoDetalle[]) => void;
    removeDetalle: (id: string) => void
}

export const PedidoContext = React.createContext<PedidoContextType | undefined>(undefined)

interface Props {
    children: React.ReactNode;
}

export const PedidoProvider: React.FC<Props> = ({ children }) => {

    const [pedido, setPedido] = React.useState<Pedido>({
        cabecera: {
            id: `P-${randomId()}`,
            fecha: new Date().toISOString().split('T')[0],
            importeTotal: 0
        },
        detalles: [],
        estado: EstadoPedido.PENDIENTE
    })

    const [porcentajeEstado, setPorcentajeEstado] = React.useState(0);

    const calculaImporteTotal = (): number => {
        let importeTotal = 0;
        pedido.detalles?.forEach(detalle => {
            if (!isNaN(parseInt(detalle.importe))) {
                importeTotal += Number(detalle.importe)
            }
        })
        // console.log('calculaImporteTotal', importeTotal)
        return Number(importeTotal.toFixed(2));
    }

    React.useEffect(() => {
        const importeTotal = calculaImporteTotal()
        const estadoPedido = calculaEstadoPedido();
        const newCabecera = { ...pedido.cabecera, importeTotal }
        setPedido({
            ...pedido,
            estado: estadoPedido,
            cabecera: newCabecera
        })
        setPorcentajeEstado(calculaPorcentajeCompletado())
    }, [pedido.detalles])

    const setCabecera = (newCabecera: PedidoCabecera) => {
        setPedido({
            ...pedido,
            cabecera: newCabecera
        })
    }

    const setEstado = (newEstado: EstadoPedido) => {
        setPedido({
            ...pedido,
            estado: newEstado
        })
    }

    const newDetalle = () => {
        const newDetalle: PedidoDetalle = {
            id: `D ${randomId()}`,
            estado: EstadoPedidoDetalle.PENDIENTE,
            descripcion: "",
            importe: "0",
            selected: false,
            error: false
        }
        const newDetalles = [...pedido.detalles]
        newDetalles.unshift(newDetalle)
        setPedido({
            ...pedido,
            detalles: newDetalles
        })
    }

    const setDetalles = (detalles: PedidoDetalle[]) => {
        setPedido({
            ...pedido,
            detalles
        })
    }

    const removeDetalle = (id: string) => {
        const newDetalles = pedido.detalles.filter(p => p.id !== id)
        setDetalles(newDetalles)
    }



    const calculaEstadoPedido = (): EstadoPedido => {
        let estadoPedido: EstadoPedido = EstadoPedido.PENDIENTE;
        const numEstadosMap = new Map<EstadoPedidoDetalle, number>()
        if (pedido.detalles.length > 0) {
            pedido.detalles.forEach(detalle => {
                const n = numEstadosMap.get(detalle.estado) ?? 0
                numEstadosMap.set(detalle.estado, n + 1)
            })
            estadoPedido = numEstadosMap.get(EstadoPedidoDetalle.VALIDADO) === pedido.detalles.length ? EstadoPedido.VALIDADO : EstadoPedido.PENDIENTE;
        }
        return estadoPedido;
    }

    const calculaPorcentajeCompletado = (): number => {
        let porcentajeCompletado = 0;
        if (pedido.detalles) {
            porcentajeCompletado = pedido.detalles.length == 0 ? 0 : Math.round((pedido.detalles.filter(detalle => detalle.estado == EstadoPedidoDetalle.VALIDADO).length / pedido.detalles.length) * 100);
        }
        setPorcentajeEstado(porcentajeCompletado)
        return porcentajeCompletado;
    }

    return (<PedidoContext.Provider value={{
        pedido,
        porcentajeEstado,
        isTerminado: () => {
            return pedido.estado===EstadoPedido.TERMINADO
        },
        isAnyDetallesSelected: () => {
            return pedido.detalles.filter(detalle=>detalle.selected).length>0;
        },
        setEstado,
        setCabecera,
        newDetalle,
        setDetalles,
        removeDetalle
    }}>
        {children}
    </PedidoContext.Provider>)
}