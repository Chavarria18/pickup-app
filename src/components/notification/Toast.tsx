interface Props {
    mensaje: string;
    mostrar: boolean;
}

function Toast({ mensaje, mostrar }: Props) {
    return (
        <div
            className={`toast ${mostrar ? "show" : "hide"}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="toast-header">
                <strong className="me-auto">Carrito</strong>
                <small>Ahora</small>
            </div>

            <div className="toast-body">
                {mensaje}
            </div>
        </div>
    );
}

export default Toast;