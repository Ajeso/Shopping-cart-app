import { useState } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuantityInput from "./QuantityInput";

function Wrapper({ initial = 1 }) {
  const [value, setValue] = useState(initial);
  return <QuantityInput value={value} onChange={setValue} />;
}

describe("QuantityInput", () => {
  it("increases the quantity when + is clicked", async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    await user.click(
      screen.getByRole("button", { name: /increase quantity/i }),
    );

    expect(screen.getByLabelText("Quantity")).toHaveValue(2);
  });

  it("decreases the quantity when - is clicked", async () => {
    const user = userEvent.setup();
    render(<Wrapper initial={3} />);

    await user.click(
      screen.getByRole("button", { name: /decrease quantity/i }),
    );

    expect(screen.getByLabelText("Quantity")).toHaveValue(2);
  });

  it("disables the - button at the minimum", () => {
    render(<Wrapper initial={1} />);

    expect(
      screen.getByRole("button", { name: /decrease quantity/i }),
    ).toBeDisabled();
  });

  it("lets the user type a quantity", async () => {
    const user = userEvent.setup();
    render(<Wrapper />);

    const input = screen.getByLabelText("Quantity");
    await user.clear(input);
    await user.type(input, "5");

    expect(input).toHaveValue(5);
  });
});
