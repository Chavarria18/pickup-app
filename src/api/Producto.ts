import { request } from "./client";
import type { Producto } from "../model/Product";

export const getProductosPorTienda = (tiendaId: string, signal?: AbortSignal) =>
  request<Producto[]>(`/tiendas/${tiendaId}/productos`, { signal });