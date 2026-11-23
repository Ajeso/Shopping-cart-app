import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

const product = {
  id: 1,
  title: "Test Backpack",
  price: 25.5,
  image: "https://example.com/bag.jpg",
};

describe("ProductCard", () => {
  it("shows the product title, price, and image", () => {
    render(<ProductCard product={product} onAddToCart={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: "Test Backpack" }),
    ).toBeInTheDocument();
    expect(screen.getByText("$25.50")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Test Backpack" }),
    ).toBeInTheDocument();
  });

  it("adds one item by default", async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();
    render(<ProductCard product={product} onAddToCart={onAddToCart} />);

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(onAddToCart).toHaveBeenCalledWith(product, 1);
  });

  it("adds the chosen quantity", async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();
    render(<ProductCard product={product} onAddToCart={onAddToCart} />);

    await user.click(
      screen.getByRole("button", { name: /increase quantity/i }),
    );
    await user.click(
      screen.getByRole("button", { name: /increase quantity/i }),
    );
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(onAddToCart).toHaveBeenCalledWith(product, 3);
  });

  it("resets the quantity to 1 after adding", async () => {
    const user = userEvent.setup();
    render(<ProductCard product={product} onAddToCart={vi.fn()} />);

    await user.click(
      screen.getByRole("button", { name: /increase quantity/i }),
    );
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(screen.getByLabelText("Quantity")).toHaveValue(1);
  });

  it("disables Add To Cart when the field is empty", async () => {
    const user = userEvent.setup();
    render(<ProductCard product={product} onAddToCart={vi.fn()} />);

    await user.clear(screen.getByLabelText("Quantity"));

    expect(screen.getByRole("button", { name: /add to cart/i })).toBeDisabled();
  });
});
