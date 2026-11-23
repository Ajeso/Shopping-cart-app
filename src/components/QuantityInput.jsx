export default function QuantityInput({
  value,
  onChange,
  min = 1,
  label = "Quantity",
}) {
  const numericValue = Number(value) || 0;

  function handleTyping(e) {
    const typed = e.target.value;
    // Allow an empty field while the user is typing
    if (typed === "") {
      onChange("");
      return;
    }
    const parsed = parseInt(typed, 10);
    if (!Number.isNaN(parsed)) {
      onChange(Math.max(parsed, 0));
    }
  }

  function handleBlur() {
    // If the field is left empty or too low, snap back to the minimum
    if (value === "" || numericValue < min) {
      onChange(min);
    }
  }

  return (
    <div className="quantity-input">
      <button
        type="button"
        aria-label={`Decrease ${label.toLowerCase()}`}
        onClick={() => onChange(Math.max(numericValue - 1, min))}
        disabled={numericValue <= min}
      >
        -
      </button>

      <input
        type="number"
        aria-label={label}
        value={value}
        onChange={handleTyping}
        onBlur={handleBlur}
        min={min}
      />

      <button
        type="button"
        aria-label={`Increase ${label.toLowerCase()}`}
        onClick={() => onChange(numericValue + 1)}
      >
        +
      </button>
    </div>
  );
}
