import { request } from "./client";
import type { Tienda } from "../model/Store";

export const getTiendas = (signal?: AbortSignal) =>
  request<Tienda[]>("/tiendas", { signal });