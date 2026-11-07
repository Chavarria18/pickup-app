import { request } from "./client";
import type { NuevaOrden, OrdenCreada } from "../model/Order";

export const crearOrden = (orden: NuevaOrden) =>{
  console.log(orden)
  request<OrdenCreada>("/ordenes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orden),
  } );
  
}

