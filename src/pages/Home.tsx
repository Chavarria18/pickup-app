import StoreMap from "../components/stores/StoreMap";
import { useTiendas } from "../hooks/useTienda";
import Catalogo from "./Catalog";
import { useState } from "react";

function Home() {


    const { tiendas, cargando, error } = useTiendas();
    const [tiendaSeleccionada, setTiendaSeleccionada] = useState<string | null>(null);

    if (cargando) return <p>Loading stores...</p>;
    if (error) return <p>Could not load stores: {error}</p>;
    return (

        <div className="container">
            <div className="row">
                <div className="col-md-12">

                    <StoreMap tiendas={tiendas}  onSelectStore={setTiendaSeleccionada} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">

                     <Catalogo tiendaId={tiendaSeleccionada} />
                </div>
            </div>
        </div>

    );
}

export default Home;