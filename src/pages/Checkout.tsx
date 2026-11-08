import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCarritoStore, selectTotal } from "../hooks/useCart";
import { crearOrden } from "../api/Order";
import CheckoutForm from "../components/checkout/CheckoutForm";
import Resumen from "../components/checkout/Resumen";
import type { DatosCliente } from "../schema/checkoutSchema";

export default function Checkout() {
  const navigate = useNavigate();
  const tienda = useCarritoStore((s) => s.tienda);
  const items = useCarritoStore((s) => s.items);
  const total = useCarritoStore(selectTotal);


  const [enviando, setEnviando] = useState(false);
  const [errorApi, setErrorApi] = useState<string | null>(null);


  if (!tienda || items.length === 0) return <Navigate to="/" replace />;

  const handleSubmit = async (datos: DatosCliente) => {
    setEnviando(true);
    setErrorApi(null);
    try {
      const orden = await crearOrden({
        nombreCliente: datos.nombreCliente,
        telefono: datos.telefono,
        correo: datos.correo || undefined,
        tiendaId: tienda.id,
        items: items.map((i) => ({ productoId: i.productoId, cantidad: i.cantidad })),
      });
      

      console.log(orden); 
      navigate("/confirm", { state: { orden }, replace: true });
 
    } catch (e) {
      setErrorApi((e as Error).message); 
      setEnviando(false);
    }
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