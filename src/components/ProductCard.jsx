import { useState } from "react";
import QuantityInput from "./QuantityInput";

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const isValid = Number(quantity) >= 1;

  function handleAdd() {
    if (!isValid) return;
    onAddToCart(product, Number(quantity));
    setQuantity(1);
  }

  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p className="price">${product.price.toFixed(2)}</p>

      <QuantityInput value={quantity} onChange={setQuantity} />

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAdd}
        disabled={!isValid}
      >
        Add To Cart
      </button>
    </article>
  );
}
