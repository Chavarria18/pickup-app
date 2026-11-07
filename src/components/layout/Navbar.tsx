import { useCarritoStore, selectCantidadItems } from "../../hooks/useCart";
import { Link } from "react-router-dom";
function Navbar() {
    const totalItems = useCarritoStore(selectCantidadItems);
    return (<nav className="navbar bg-1 fg-2">
        <Link to="/"><i className="bi bi-house"></i></Link>
        <Link to="/cart"><i className="bi bi-cart"></i> ({totalItems})</Link>

    </nav>);
}

export default Navbar;