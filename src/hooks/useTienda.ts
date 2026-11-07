import { useEffect, useState } from "react";
import { getTiendas } from "../api/Tienda";
import type { Tienda } from "../model/Store";


export function useTiendas() {
    const [tiendas, setTiendas] = useState<Tienda[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        getTiendas(controller.signal)
            .then(setTiendas)
            .catch((e: Error) => {
                if (e.name !== "AbortError") setError(e.message);
            })
            .finally(() => setCargando(false));

        return () => controller.abort();
    }, []);

    return { tiendas, cargando, error };
}