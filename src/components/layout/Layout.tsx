import { Outlet, Link } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/catalog">Catalog</Link>
               
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
}