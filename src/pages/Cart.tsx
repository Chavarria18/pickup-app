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

   
    return (
        <div className="container py-4">

            <div className="d-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0">
                    Carrito de compra <i className="bi bi-cart"></i>
                </h1>               
            </div>

            <div className="row g-4">


                <div className="col-lg-8">


                    <div className="card border-0 shadow-sm mb-3">
                        <div className="card-body">
                            <div className="d-flex align-items-center gap-3">
                                <i className="bi bi-shop fs-3 text-primary"></i>
                                <div>
                                    <small className="text-muted">Pickup at</small>
                                    <h6 className="mb-0">{tienda.nombre}</h6>
                                    <small className="text-muted">
                                        {tienda.direccion}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>


                    {items.length > 0 ? (
                        items.map((i) => (
                            <CartItem
                                key={i.productoId}
                                item={i}
                                onIncrementar={incrementar}
                                onDisminuir={disminuir}
                                onEliminar={eliminar}
                            />
                        ))
                    ) : (
                        <div className="card border-0 shadow-sm">
                            <div className="card-body text-center py-5">
                                <i className="bi bi-cart-x fs-1 text-muted"></i>
                                <h5 className="mt-3">Tu carrito está vacío</h5>
                                <button
                                    className="btn btn-primary mt-2"
                                    onClick={() => navigate("/")}
                                >
                                    Explorar catálogo
                                </button>
                            </div>
                        </div>
                    )}
                </div>

        
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm sticky-top" style={{ top: "20px" }}>
                        <div className="card-body">
                            <h5 className="card-title mb-4">
                                Resumen de compra
                            </h5>

                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Productos</span>
                                <span>{items.length}</span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <strong>Total</strong>
                                <h4 className="mb-0 text-primary">
                                    Q {total.toFixed(2)}
                                </h4>
                            </div>

                            <button
                                className="btn btn-primary w-100 mb-2"
                                onClick={() => navigate("/checkout")}
                                disabled={items.length === 0}
                            >
                                Continuar <i className="bi bi-arrow-right"></i>
                            </button>

                            <button
                                className="btn btn-outline-secondary w-100"
                                onClick={() => navigate("/")}
                            >
                                <i className="bi bi-arrow-left"></i> Catalogo
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}