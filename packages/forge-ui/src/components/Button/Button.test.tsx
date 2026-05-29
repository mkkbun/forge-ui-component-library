/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button component", () => {
  it("renders correctly with default values", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeDefined();
    expect(btn.className).toContain("bg-primary");
  });

  it("handles event clicks", () => {
    const fn = vi.fn();
    render(<Button onClick={fn}>Click me</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is active", () => {
    render(<Button disabled>Click me</Button>);
    const btn = screen.getByRole("button") as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(btn.className).toContain("opacity-50");
  });

  it("renders loading spinner and disables click", () => {
    const fn = vi.fn();
    render(<Button isLoading onClick={fn}>Click me</Button>);
    const btn = screen.getByRole("button") as HTMLButtonElement;
    fireEvent.click(btn);
    expect(fn).not.toHaveBeenCalled();
    expect(btn.disabled).toBe(true);
  });

  it("supports polymorphic as prop", () => {
    render(<Button as="a" href="https://google.com">Anchor tag</Button>);
    const link = screen.getByRole("link", { name: /anchor tag/i });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("https://google.com");
  });
});
