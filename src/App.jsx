import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </CartProvider>
  );
}
