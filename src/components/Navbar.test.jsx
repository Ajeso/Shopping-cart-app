import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import { useCart } from "../hooks/useCart";
import Navbar from "./Navbar";

function AddItemButton() {
  const { addToCart } = useCart();
  const product = { id: 1, title: "Item", price: 10, image: "x.jpg" };

  return (
    <button type="button" onClick={() => addToCart(product, 2)}>
      Add test item
    </button>
  );
}

function renderNavbar() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Navbar />
        <AddItemButton />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe("Navbar", () => {
  it("shows links to the home, shop, and cart pages", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cart" })).toBeInTheDocument();
  });

  it("shows no count when the cart is empty", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: "Cart" })).toHaveTextContent(
      /^Cart$/,
    );
  });

  it("updates the count as items are added", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: "Add test item" }));
    expect(screen.getByRole("link", { name: "Cart (2)" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Add test item" }));
    expect(screen.getByRole("link", { name: "Cart (4)" })).toBeInTheDocument();
  });
});
