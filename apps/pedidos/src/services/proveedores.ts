import { Proveedor } from "../types";

export const getProveedores = (): Proveedor[] => {
    return [
      { id: 'P1', descripcion: 'Proveedor A' },
      { id: 'P2', descripcion: 'Proveedor B' },
      { id: 'P3', descripcion: 'Proveedor C' },
      { id: 'P4', descripcion: 'Proveedor D' },
    ]
  };