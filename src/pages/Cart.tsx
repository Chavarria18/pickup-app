import { Navigate, useNavigate } from "react-router-dom";
import { useCarritoStore, selectTotal } from "../hooks/useCart"
import CartItem from "../components/cart/CartItem";

export default function Carrito() {
    const navigate = useNavigate();
    const tienda = useCarritoStore((s) => s.tienda);
    const items = useCarritoStore((s) => s.items);
    const total = useCarritoStore(selectTotal);
    const incrementar = useCarritoStore((s) => s.incrementar);
    const disminuir = useCarritoStore((s) => s.disminuir);
    const eliminar = useCarritoStore((s) => s.eliminar);

    if (!tienda) return <Navigate to="/" replace />;

    if (items.length === 0) {
        return (
            <section>
                <h1>Your order is empty</h1>
                <button onClick={() => navigate("/")}>Back to catalog</button>
            </section>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Carrito de compra <i className="bi bi-cart"></i> </h1>
                    <p>Pickup at: <strong>{tienda.nombre}</strong> ({tienda.direccion})</p>

                    {items.map((i) => (
                        <CartItem
                            key={i.productoId}
                            item={i}
                            onIncrementar={incrementar}
                            onDisminuir={disminuir}
                            onEliminar={eliminar}
                        />
                    ))}

                    <h2>Total: Q {total.toFixed(2)}</h2>

                    <button onClick={() => navigate("/catalogo")}>Keep shopping</button>
                    <button onClick={() => navigate("/checkout")}>Continue</button>
                </div>
            </div>
        </div>

    );
}