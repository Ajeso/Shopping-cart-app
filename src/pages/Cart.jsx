import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <section>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop">Go to the shop</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
    </section>
  );
}
