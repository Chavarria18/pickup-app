import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Tienda } from "../../model/Store";
import { useEffect } from "react";
import { iconNormal, iconSeleccionado } from "../../utils/leafletIcons";
interface Props {
    tiendas: Tienda[];
    onSelectStore: (tienda: Tienda) => void;
    activaId: string | null;
}

interface CenterMapProps {
    tiendas: Tienda[];
     activaId: string | null;
}

function CenterMap({ tiendas,activaId }: CenterMapProps) {
    const map = useMap();

    useEffect(() => {
        if (!tiendas.length) return;

        map.fitBounds(
            tiendas.map(t => [t.lat, t.lng])
        );
    }, [tiendas,activaId]);

    return null;
}


function StoreMap({ tiendas, onSelectStore, activaId }: Props) {
    const position: [number, number] = [14.6349, -90.5069];

    return (

        <MapContainer
            center={position}
            zoom={15}
            style={{
                height: "300px",
                width: "100%",
                borderRadius: "10px"
            }}
            scrollWheelZoom={false}
        >



            <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            <CenterMap tiendas={tiendas} activaId={activaId} />
            {tiendas.map((t) => (
                <Marker key={t.id} position={[t.lat, t.lng]} icon={activaId === t.id ? iconSeleccionado : iconNormal}>
                    <Popup minWidth={320} maxWidth={360}>

                        <div className="card mb-3" style={{ maxWidth: "540px" }}>
                            <div className="row g-0">
                              <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    <img  src={t.imagen} alt={t.nombre}
                                        style={{
                                            width: "100%",
                                            height: "120px",
                                            objectFit: "cover",
                                            borderRadius: "6px"
                                        }}
                                    />

                                </div>
                                <div className="col-md-6">
                                    <div className="card-body">
                                        <h5 className="card-title">{t.nombre}</h5>
                                        <p className="card-text"> {t.direccion}</p>
                                        <p className="card-text"><small className="text-body-secondary">{t.horario}</small></p>
                                        <button className="btn btn-info" onClick={() => onSelectStore(t)}  >Seleccionar Tienda</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default StoreMap;