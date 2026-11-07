import { useEffect, useState } from "react";
import { getProductosPorTienda } from "../api/Producto";
import type { Producto } from "../model/Product";

export function useProductos(tiendaId: string | undefined) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tiendaId) return;

    const controller = new AbortController();
    setCargando(true);
    setError(null);

    getProductosPorTienda(tiendaId, controller.signal)
      .then(setProductos)
      .catch((e: Error) => {
        if (e.name !== "AbortError") setError(e.message);
      })
      .finally(() => setCargando(false));

    return () => controller.abort();
  }, [tiendaId]);

  return { productos, cargando, error };
}