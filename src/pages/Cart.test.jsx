import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import { useCart } from "../hooks/useCart";
import Cart from "./Cart";

function AddItemButton() {
  const { addToCart } = useCart();
  const product = { id: 1, title: "Test Backpack", price: 10, image: "x.jpg" };

  return (
    <button type="button" onClick={() => addToCart(product, 2)}>
      Add test item
    </button>
  );
}

function renderCart() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <AddItemButton />
        <Cart />
      </CartProvider>
    </MemoryRouter>,
  );
}

async function addTestItem(user) {
  await user.click(screen.getByRole("button", { name: "Add test item" }));
}

describe("Cart page", () => {
  it("shows an empty message when the cart has no items", () => {
    renderCart();

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to the shop/i }),
    ).toBeInTheDocument();
  });

  it("shows the items and the total after adding", async () => {
    const user = userEvent.setup();
    renderCart();

    await addTestItem(user);

    expect(
      screen.getByRole("heading", { name: "Test Backpack" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Quantity")).toHaveValue(2);
    expect(screen.getByText("Total: $20.00")).toBeInTheDocument();
  });

  it("updates the total when the quantity is increased", async () => {
    const user = userEvent.setup();
    renderCart();

    await addTestItem(user);
    await user.click(
      screen.getByRole("button", { name: /increase quantity/i }),
    );

    expect(screen.getByText("Total: $30.00")).toBeInTheDocument();
  });

  it("removes the item and shows the empty message again", async () => {
    const user = userEvent.setup();
    renderCart();

    await addTestItem(user);
    await user.click(screen.getByRole("button", { name: /remove/i }));

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Test Backpack" }),
    ).not.toBeInTheDocument();
  });
});
