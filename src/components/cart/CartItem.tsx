import type { CartModel } from "../../model/CartModel";

interface Props {
  item: CartModel;
  onIncrementar: (id: string) => void;
  onDisminuir: (id: string) => void;
  onEliminar: (id: string) => void;
}

export default function CartItem({ item, onIncrementar, onDisminuir, onEliminar }: Props) {
  return (
    <div className="carrito-item">
      <img src={item.imagen} alt={item.nombre} width={64} height={64} />
      <div>
        <strong>{item.nombre}</strong>
        <p>Q {item.precio.toFixed(2)} each</p>
      </div>

      <div>
        <button onClick={() => onDisminuir(item.productoId)}>-</button>
        <span> {item.cantidad} </span>
        <button
          onClick={() => onIncrementar(item.productoId)}
          disabled={item.cantidad >= item.disponibilidad}
        >
          +
        </button>
      </div>

      <span>Subtotal: Q {(item.precio * item.cantidad).toFixed(2)}</span>
      <button onClick={() => onEliminar(item.productoId)}>Remove</button>
    </div>
  );
}