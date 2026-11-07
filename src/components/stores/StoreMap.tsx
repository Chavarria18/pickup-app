import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTiendas } from "../../hooks/useTienda";
import type { Tienda } from "../../model/Store";


interface Props {
    tiendas: Tienda[];
    onSelectStore: (id: string) => void;
}
function StoreMap({ tiendas,onSelectStore  }: Props) {
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



            {tiendas.map((t) => (
                <Marker key={t.id} position={[t.lat, t.lng]}>
                    <Popup>
                        <strong>{t.nombre}</strong>
                        <br />
                        {t.direccion}
                        <br />
                        {t.horario}
                        <br />
                        <button    onClick={() => onSelectStore(t.id)} >Select store</button>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default StoreMap;