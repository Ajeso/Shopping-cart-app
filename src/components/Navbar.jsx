import { NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <span className="navbar-brand">My Shop</span>
      <div className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/cart">Cart{totalItems > 0 && ` (${totalItems})`}</NavLink>
      </div>
    </nav>
  );
}
