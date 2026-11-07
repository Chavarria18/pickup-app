import { MapContainer, TileLayer, Marker, Popup,useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Tienda } from "../../model/Store";
import { useEffect } from "react";

interface Props {
    tiendas: Tienda[];
    onSelectStore: (tienda: Tienda) => void;
}

interface CenterMapProps {
    tiendas: Tienda[];
}

function CenterMap({ tiendas }: CenterMapProps) {
    const map = useMap();

    useEffect(() => {
        if (!tiendas.length) return;

        map.fitBounds(
            tiendas.map(t => [t.lat, t.lng])
        );
    }, [tiendas]);

    return null;
}


function StoreMap({ tiendas, onSelectStore }: Props) {
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


            <CenterMap tiendas={tiendas} />
            {tiendas.map((t) => (
                <Marker key={t.id} position={[t.lat, t.lng]}>
                    <Popup>
                        <strong>{t.nombre}</strong>
                        <br />
                        {t.direccion}
                        <br />
                        {t.horario}
                        <br />
                        <button onClick={() => onSelectStore(t)} >Select store</button>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default StoreMap;