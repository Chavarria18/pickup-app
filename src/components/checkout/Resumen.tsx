import type { CartModel } from "../../model/CartModel";
import type { Tienda } from "../../model/Store";

interface Props {
  tienda: Tienda;
  items: CartModel[];
  total: number;
}

export default function Resumen({ tienda, items, total }: Props) {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="h5">Resumen</h2>
        <p className="mb-1"><strong>Recoger en :</strong> {tienda.nombre}</p>
        <p className="text-muted small">{tienda.direccion} · {tienda.horario}</p>

        <table className="table">
          <thead>
            <tr>
              <td>Nombre</td>
              <td>Canitdad</td>
              <td>Precio</td>
              <td>Subtotal</td>

            </tr>
          </thead>
          {items.map((i) => (
            <tr>
              <td>{i.nombre}</td>
              <td>{i.cantidad}</td>
              <td>{i.precio}</td>
              <td>Q {(i.precio * i.cantidad).toFixed(2)}</td>




            </tr>
           
          ))}
        </table>

        <div className="d-flex justify-content-between fw-bold fs-5">
          <span>Total</span>
          <span>Q {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}