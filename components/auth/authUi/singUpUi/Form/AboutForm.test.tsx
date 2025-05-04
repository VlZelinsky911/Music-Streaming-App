import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AboutPage from "./AboutForm";
import { vi } from "vitest";


const mockPush = vi.fn();

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: () => ({
      push: mockPush,
    }),
  };
});

describe("AboutPage", () => {

	beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the form with input and button", () => {
    render(<AboutPage />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(<AboutPage />);

    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/day is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Please select a gender/i)).toBeInTheDocument();
    });
  });

  it("enables the submit button when all fields are valid", async () => {
    render(<AboutPage />);

    fireEvent.input(
      screen.getByPlaceholderText(/this name will show on your profile/i),
      {
        target: { value: "John Doe" },
      }
    );

    fireEvent.input(screen.getByPlaceholderText(/dd/i), {
      target: { value: "1" },
    });

    fireEvent.change(screen.getByDisplayValue("Month"), {
      target: { value: "January" },
    });

    fireEvent.input(screen.getByPlaceholderText(/yyyy/i), {
      target: { value: "1990" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: (name) => name.toLowerCase() === "male",
      })
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
    });
  });

  it("redirects to the next page on form submit", async () => {
    render(<AboutPage />);

    fireEvent.input(screen.getByPlaceholderText(/this name will show on your profile/i), {
      target: { value: "John Doe" },
    });

    fireEvent.input(screen.getByPlaceholderText(/dd/i), {
      target: { value: "1" },
    });

    fireEvent.change(screen.getByDisplayValue("Month"), {
      target: { value: "January" },
    });

    fireEvent.input(screen.getByPlaceholderText(/yyyy/i), {
      target: { value: "1990" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: (name) => name.toLowerCase() === "male",
      })
    );

		fireEvent.click(screen.getByRole("button", { name: /next/i }));

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith("/sign-up/register");
		});
	});
});
