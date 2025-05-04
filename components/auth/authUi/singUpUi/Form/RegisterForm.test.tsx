import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Mock, vi } from "vitest";
import TermsPage from "./RegisterForm";
import { supabase } from "../../../../../lib/supabaseClient";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("../../../../../lib/supabaseClient", () => ({
  supabase: {
    auth: {
      signUp: vi.fn().mockResolvedValue({
        data: { user: { id: "123" } },
        error: null,
      }),
    },
  },
}));

describe("TermsPage", () => {
  let mockPush: Mock;

  beforeEach(() => {
    mockPush = vi.fn();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders checkboxes and submit button", () => {
    render(<TermsPage />);
    expect(
      screen.getByLabelText(/receive news and offers/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/registration details for marketing/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/i agree to/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("shows validation error if 'agree to terms' is unchecked", async () => {
    render(<TermsPage />);
    fireEvent.click(screen.getByLabelText(/i agree to/i));
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(await screen.findByText(/прийміть умови/i)).toBeInTheDocument();
    expect(vi.mocked(supabase.auth.signUp)).not.toHaveBeenCalled();
  });

	it("enables the submit button when all fields are valid", async () => {
		render(<TermsPage />);
		fireEvent.click(screen.getByLabelText(/i agree to/i));
		fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

		await waitFor(() => {
			expect(screen.getByRole("button", { name: /sign up/i })).toBeEnabled();
		});
	});
});
