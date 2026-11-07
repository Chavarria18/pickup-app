import { Navigate, useNavigate } from "react-router-dom";

import { useProductos } from "../hooks/useProducto";

import { useCarritoStore } from "../hooks/useCart";


interface Props {
    tiendaId: string | undefined;
}


export default function Catalogo({ tiendaId }: Props) {

    const { productos, cargando, error } = useProductos(tiendaId);

    const items = useCarritoStore((s) => s.items);
    const agregar = useCarritoStore((s) => s.agregar);

    const cantidadDe = (id: string) =>
        items.find((i) => i.productoId === id)?.cantidad ?? 0;

    if (cargando) return <p>Loading products...</p>;
    if (error) return <p>Could not load products: {error}</p>;

    return (
        <section>


            <ul>
                {productos.map((p) => {
                    const enCarrito = cantidadDe(p.id);
                    const restantes = p.disponibilidad - enCarrito;
                    const maxAlcanzado = cantidadDe(p.id) >= p.disponibilidad;

                    return (
                        <li key={p.id}>
                            {p.nombre} - Q {p.precio} ({restantes} disponibles)
                            <button onClick={() => agregar(p)} disabled={maxAlcanzado}>
                                {maxAlcanzado ? "Max reached" : "Add to order"}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}