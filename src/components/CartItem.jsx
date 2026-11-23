import { useState } from "react";
import QuantityInput from "./QuantityInput";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [draft, setDraft] = useState(item.quantity);

  function handleChange(value) {
    setDraft(value);
    if (value !== "" && Number(value) >= 1) {
      onUpdateQuantity(item.id, Number(value));
    }
  }

  return (
    <li className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="cart-item-info">
        <h2>{item.title}</h2>
        <p>${item.price.toFixed(2)} each</p>
      </div>

      <QuantityInput value={draft} onChange={handleChange} />

      <p className="cart-item-subtotal">
        Subtotal: ${(item.price * item.quantity).toFixed(2)}
      </p>

      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </li>
  );
}
