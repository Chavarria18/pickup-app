import { useState } from "react";
import { crearOrden } from "../api/Order";
import type { NuevaOrden, OrdenCreada } from "../model/Order";

export default function useOrden() {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const crear = async (orden: NuevaOrden): Promise<OrdenCreada | null> => {
    setEnviando(true);
    setError(null);
    try {
      return await crearOrden(orden);
    } catch (e) {
      setError((e as Error).message);
      return null;
    } finally {
      setEnviando(false);
    }
  };

  return { crear, enviando, error };
}