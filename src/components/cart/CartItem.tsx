import type { CartModel } from "../../model/CartModel";

interface Props {
  item: CartModel;
  onIncrementar: (id: string) => void;
  onDisminuir: (id: string) => void;
  onEliminar: (id: string) => void;
}

export default function CartItem({ item, onIncrementar, onDisminuir, onEliminar }: Props) {
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={item.imagen} alt={item.nombre} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
        </div>
        <div className="col-md-8">
          <div className="card-body">

            <h5 className="card-title">{item.nombre}</h5>
            <p className="card-text">Q {(item.precio * item.cantidad).toFixed(2)}</p>
            <div>
              <button className="btn btn-info" onClick={() => onDisminuir(item.productoId)}>-</button>
              <span> {item.cantidad} </span>
              <button className="btn btn-info"
                onClick={() => onIncrementar(item.productoId)}
                disabled={item.cantidad >= item.disponibilidad}
              >
                +
              </button>
            </div>  
            <br></br>    
            <button className="btn btn-danger" onClick={() => onEliminar(item.productoId)}>Quitar</button>

          </div>
        </div>
      </div>

    </div>
  );
}