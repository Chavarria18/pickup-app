import { Navigate, useNavigate } from "react-router-dom";
import { useCarritoStore, selectTotal } from "../store/useCart";
import CheckoutForm from "../components/checkout/CheckoutForm";
import Resumen from "../components/checkout/Resumen";
import type { DatosCliente } from "../schema/checkoutSchema";
import useOrden from "../hooks/useOrder";

export default function Checkout() {
  const navigate = useNavigate();
  const tienda = useCarritoStore((s) => s.tienda);
  const items = useCarritoStore((s) => s.items);
  const total = useCarritoStore(selectTotal);
  const { crear, enviando, error: errorApi } = useOrden();



  if (!tienda || items.length === 0) return <Navigate to="/" replace />;


  const handleSubmit = async (datos: DatosCliente) => {
    const orden = await crear({
      nombreCliente: datos.nombreCliente,
      telefono: datos.telefono,
      correo: datos.correo || undefined,
      tiendaId: tienda.id,
      items: items.map((i) => ({ productoId: i.productoId, cantidad: i.cantidad })),
    });

    if (orden) navigate("/confirm", { state: { orden }, replace: true });
  };

  return (
    <div className="container py-4">
      <button className="btn btn-link px-0 mb-3" onClick={() => navigate("/cart")}>
        ← Back to cart
      </button>
      <h1 className="h3 mb-4">Confirmar pedido</h1>

      <div className="row g-4">
        <div className="col-md-6 order-md-2">
          <Resumen tienda={tienda} items={items} total={total} />
        </div>

        <div className="col-md-6 order-md-1">
          <h2 className="h5">Detalles</h2>

          {errorApi && (
            <div className="alert alert-danger" role="alert">
              {errorApi}
              <div className="mt-2">
                <button className="btn btn-sm btn-outline-danger" onClick={() => navigate("/")}>
                  Volver al catalogo
                </button>
              </div>
            </div>
          )}

          <CheckoutForm onSubmit={handleSubmit} enviando={enviando} />
        </div>
      </div>
    </div>
  );
}