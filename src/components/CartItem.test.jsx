import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "./CartItem";

const item = {
  id: 1,
  title: "Test Backpack",
  price: 25,
  image: "https://example.com/bag.jpg",
  quantity: 2,
};

function renderItem(props = {}) {
  const onUpdateQuantity = vi.fn();
  const onRemove = vi.fn();

  render(
    <ul>
      <CartItem
        item={item}
        onUpdateQuantity={onUpdateQuantity}
        onRemove={onRemove}
        {...props}
      />
    </ul>,
  );

  return { onUpdateQuantity, onRemove };
}

describe("CartItem", () => {
  it("shows the title, price, quantity, and subtotal", () => {
    renderItem();

    expect(
      screen.getByRole("heading", { name: "Test Backpack" }),
    ).toBeInTheDocument();
    expect(screen.getByText("$25.00 each")).toBeInTheDocument();
    expect(screen.getByLabelText("Quantity")).toHaveValue(2);
    expect(screen.getByText("Subtotal: $50.00")).toBeInTheDocument();
  });

  it("calls onUpdateQuantity with a higher number when + is clicked", async () => {
    const user = userEvent.setup();
    const { onUpdateQuantity } = renderItem();

    await user.click(
      screen.getByRole("button", { name: /increase quantity/i }),
    );

    expect(onUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it("calls onUpdateQuantity with a lower number when - is clicked", async () => {
    const user = userEvent.setup();
    const { onUpdateQuantity } = renderItem();

    await user.click(
      screen.getByRole("button", { name: /decrease quantity/i }),
    );

    expect(onUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it("calls onUpdateQuantity when a number is typed", async () => {
    const user = userEvent.setup();
    const { onUpdateQuantity } = renderItem();

    const input = screen.getByLabelText("Quantity");
    await user.clear(input);
    await user.type(input, "5");

    expect(onUpdateQuantity).toHaveBeenCalledWith(1, 5);
  });

  it("calls onRemove when Remove is clicked", async () => {
    const user = userEvent.setup();
    const { onRemove } = renderItem();

    await user.click(screen.getByRole("button", { name: /remove/i }));

    expect(onRemove).toHaveBeenCalledWith(1);
  });
});
