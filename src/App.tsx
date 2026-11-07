import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                   <Route path="/cart" element={<Cart />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}