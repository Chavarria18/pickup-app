import { useCarritoStore, selectCantidadItems } from "../../hooks/useCart";
import { Link } from "react-router-dom";

function Navbar() {
    const totalItems = useCarritoStore(selectCantidadItems);

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-3 fixed-top">
            <div className="container-fluid justify-content-end">
                <div className="d-flex align-items-center gap-4">

                    <Link
                        to="/"
                        className="text-dark text-decoration-none fs-4"
                    >
                        <i className="bi bi-house-door"></i>
                    </Link>

                    <Link
                        to="/cart"
                        className="text-dark text-decoration-none fs-4 position-relative"
                    >
                        <i className="bi bi-cart3"></i>

                        {totalItems > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;