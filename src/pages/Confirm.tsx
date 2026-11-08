import { Navigate, useLocation, useNavigate } from "react-router-dom";
import type { OrdenCreada } from "../model/Order";
import { useCarritoStore } from "../hooks/useCart";
import { useEffect } from "react";
export default function Confirm() {
    const { state } = useLocation();
    const navigate = useNavigate();
    console.log(state);
    const orden = state?.orden as OrdenCreada | undefined;
    const vaciar = useCarritoStore((s) => s.vaciar);

    useEffect(() => {
        if (orden) vaciar();
    }, []);
    
    if (!orden) return <Navigate to="/" replace />;

    return (
        <div className="container py-5 text-center" style={{ maxWidth: 560 }}>
            <div className="display-4 text-success mb-2">✓</div>
            <h1 className="h3">Pedido #{orden.ordenId}</h1>
            <p className="lead">Tu pedido ha sido recibido correctamente.</p>

            <div className="card text-start my-4">
                <div className="card-body">
                    <p className="mb-1">
                        <strong>Lugar de Pickup:</strong> {orden.tiendaNombre}
                    </p>
                    <p className="mb-3">
                        <strong>Tiempo estimado:</strong> {orden.tiempoEstimado}
                    </p>

                    <ul className="list-group list-group-flush">
                        {orden.items.map((i) => (
                            <li
                                key={i.productoId}
                                className="list-group-item d-flex justify-content-between px-0"
                            >
                                <span>{i.nombre} × {i.cantidad}</span>
                                <span>Q {i.subtotal.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex justify-content-between fw-bold mt-3">
                        <span>Total</span>
                        <span>Q {orden.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary" onClick={() => navigate("/")}>
                Nuevo pedido
            </button>
        </div>
    );
}