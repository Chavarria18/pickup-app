export interface NuevaOrden {
  nombreCliente: string;
  telefono: string;
  correo?: string;
  tiendaId: string;
  items: { productoId: string; cantidad: number }[];
}

export interface OrdenCreada {
  ordenId: string;
  tiendaNombre: string;
  items: {
    productoId: string;
    nombre: string;
    precioUnitario: number;
    cantidad: number;
    subtotal: number;
  }[];
  total: number;
  tiempoEstimado: string;
}