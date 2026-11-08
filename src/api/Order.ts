import { request } from "./client";
import type { NuevaOrden, OrdenCreada } from "../model/Order";

export const crearOrden = (orden: NuevaOrden) =>{
 
  const response = request<OrdenCreada>("/ordenes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orden),
  } );
  console.log(response)
  return response;
  
}

