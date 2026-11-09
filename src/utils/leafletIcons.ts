import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import icon2x from "leaflet/dist/images/marker-icon-2x.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: icon,
  iconRetinaUrl: icon2x,
  shadowUrl: shadow,
});

export const iconNormal = L.divIcon({
    className: "",
    html: `<div style="
        background-color: #0d6efd;
        width: 20px;
        height: 20px;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 5px rgba(0,0,0,.5);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

export const iconSeleccionado = L.divIcon({
    className: "",
    html: `<div style="
        background-color: #dc3545;
        width: 28px;
        height: 28px;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,.6);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
});