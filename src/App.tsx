import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                  
                </Route>
            </Routes>
        </BrowserRouter>
    );
}