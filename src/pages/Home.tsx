import StoreMap from "../components/stores/StoreMap";
import { useTiendas } from "../hooks/useTienda";
import Catalogo from "./Catalog";
import { useCarritoStore } from "../hooks/useCart";
import StoreList from "../components/stores/StoreList";
    function Home() {
        const { tiendas, cargando, error } = useTiendas();
        const tienda = useCarritoStore((s) => s.tienda);
        const seleccionarTienda = useCarritoStore((s) => s.seleccionarTienda);
        if (cargando) return <p>Loading stores...</p>;
        if (error) return <p>Could not load stores: {error}</p>;

        return (
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-md-8">
                        <StoreMap tiendas={tiendas} onSelectStore={seleccionarTienda} />
                    </div>
                    <div className="col-md-4">
                        <div className="col-lg-8 order-1 order-lg-2">
                            <StoreList
                                tiendas={tiendas}
                                 activaId={tienda?.id ?? null}      
                                onSelectStore={seleccionarTienda}
                            />
                        </div>
                    </div>
                </div>
                <br />
                {tienda && (
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Catalogo - {tienda.nombre}</h2>
                            <Catalogo tiendaId={tienda.id} />
                        </div>
                    </div>
                )}
            </div>
        );
    }

export default Home;