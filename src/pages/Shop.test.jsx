import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider } from "../context/CartContext";
import { useCart } from "../hooks/useCart";
import Shop from "./Shop";

const mockProducts = [
  { id: 1, title: "Test Backpack", price: 25, image: "bag.jpg" },
  { id: 2, title: "Test Jacket", price: 40, image: "jacket.jpg" },
];

function mockFetchSuccess() {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    }),
  );
}

function CartCount() {
  const { totalItems } = useCart();
  return <p>Items in cart: {totalItems}</p>;
}

function renderShop() {
  return render(
    <CartProvider>
      <CartCount />
      <Shop />
    </CartProvider>,
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Shop page", () => {
  it("shows a loading message first", () => {
    mockFetchSuccess();
    renderShop();

    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  it("shows a card for each product once loaded", async () => {
    mockFetchSuccess();
    renderShop();

    expect(
      await screen.findByRole("heading", { name: "Test Backpack" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Test Jacket" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Loading products...")).not.toBeInTheDocument();
  });

  it("shows an error message when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );
    renderShop();

    expect(
      await screen.findByText(/something went wrong/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/status 500/i)).toBeInTheDocument();
  });

  it("shows an error message when the network is down", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network down")),
    );
    renderShop();

    expect(
      await screen.findByText("Something went wrong: Network down"),
    ).toBeInTheDocument();
  });

  it("adds products to the cart with the chosen quantity", async () => {
    const user = userEvent.setup();
    mockFetchSuccess();
    renderShop();

    await screen.findByRole("heading", { name: "Test Backpack" });
    expect(screen.getByText("Items in cart: 0")).toBeInTheDocument();

    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    await user.click(addButtons[0]);
    expect(screen.getByText("Items in cart: 1")).toBeInTheDocument();

    const increaseButtons = screen.getAllByRole("button", {
      name: /increase quantity/i,
    });
    await user.click(increaseButtons[1]);
    await user.click(increaseButtons[1]);
    await user.click(addButtons[1]);

    expect(screen.getByText("Items in cart: 4")).toBeInTheDocument();
  });
});
