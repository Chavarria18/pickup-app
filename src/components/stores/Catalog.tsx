import { useProductos } from "../../hooks/useProducto";

import { useCarritoStore } from "../../store/useCart";
import Loader from "../../global/Loader";

interface Props {
    tiendaId: string | undefined;
}


export default function Catalogo({ tiendaId }: Props) {

    const { productos, cargando, error } = useProductos(tiendaId);

    const items = useCarritoStore((s) => s.items);
    const agregar = useCarritoStore((s) => s.agregar);

    const cantidadDe = (id: string) =>
        items.find((i) => i.productoId === id)?.cantidad ?? 0;

    if (cargando) return <Loader/>;
    if (error) return <p>Could not load products: {error}</p>;

   
    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          

            {productos.map((p) => {
                const enCarrito = cantidadDe(p.id);
                const restantes = p.disponibilidad - enCarrito;
                const maxAlcanzado = cantidadDe(p.id) >= p.disponibilidad;

                return (
                    <div className="col" key={p.id}>
                        <section className="card h-100 shadow-sm border-0">
                            <img
                                src={p.imagen}
                                alt={p.nombre}
                                className="card-img-top p-3"
                                style={{ height: "180px", objectFit: "contain" }}
                            />

                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{p.nombre}</h5>

                                <p className="card-text text-muted">
                                    Q {p.precio}
                                </p>
                                <p className="small">
                                    {p.descripcion} 
                                </p>

                                <p className="small">
                                    {restantes} disponibles
                                </p>

                                <button
                                    className="btn btn-primary mt-auto"
                                    onClick={() => agregar(p)}
                                    disabled={maxAlcanzado}
                                >
                                    {maxAlcanzado ? "Maximo alcanzado" : "Añadir a orden"}
                                </button>
                            </div>
                        </section>
                    </div>
                );
            })}

        </div>
    );
}
