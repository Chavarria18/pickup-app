import type { Tienda } from "../../model/Store";

interface Props {
    tiendas: Tienda[];
    activaId: string | null;
    onSelectStore: (tienda: Tienda) => void;
}

export default function StoreList({ tiendas, activaId, onSelectStore }: Props) {
    return (
        <div className="list-group overflow-auto"
             style={{ maxHeight: "300px" }}>
            {tiendas.map((t) => (
                <button
                    key={t.id}
                    type="button"
                    className={`list-group-item list-group-item-action ${t.id === activaId ? "active" : ""}`}
                    onClick={() => onSelectStore(t)}
                >
                    <div className="fw-bold">{t.nombre}</div>
                    <small>{t.direccion}</small>
                    <br />
                    <small>{t.horario}</small>
                </button>
            ))}
        </div>
    );
}