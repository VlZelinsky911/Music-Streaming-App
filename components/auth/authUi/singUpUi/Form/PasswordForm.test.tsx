import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PasswordForm from "./PasswordForm";
import { vi } from "vitest";


vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("PasswordForm", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the form with input and button", () => {
    render(<PasswordForm />);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });

  it("shows validation messages for invalid password", async () => {
    render(<PasswordForm />);
    const input = screen.getByLabelText(/password/i);

    fireEvent.change(input, { target: { value: "short" } });
    fireEvent.blur(input);

    await waitFor(() => {
      expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it("enables button when password is valid", async () => {
    render(<PasswordForm />);
    const input = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /next/i });

    fireEvent.change(input, { target: { value: "Valid12345!" } });

    await waitFor(() => {
      expect(button).toBeEnabled();
    });
  });

  it("toggles password visibility", () => {
		render(<PasswordForm />);
		const input = screen.getByLabelText(/password/i);
		const toggleBtn = screen.getByLabelText("Show visible");
	
		expect(input).toHaveAttribute("type", "password");
	
		fireEvent.click(toggleBtn);
		expect(input).toHaveAttribute("type", "text");
	
		fireEvent.click(screen.getByLabelText("Hide visible"));
		expect(input).toHaveAttribute("type", "password");
	});
	
});
