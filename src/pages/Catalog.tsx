import { Navigate, useNavigate } from "react-router-dom";

import { useProductos } from "../hooks/useProducto";


interface Props {
    tiendaId: string | undefined;
}


export default function Catalogo({ tiendaId }: Props) {
  

   const { productos, cargando, error } = useProductos(tiendaId);


  if (cargando) return <p>Loading products...</p>;
  if (error) return <p>Could not load products: {error}</p>;

  return (
    <section>
     
      
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - Q {p.precio} ({p.disponibilidad} available)
          </li>
        ))}
      </ul>
    </section>
  );
}