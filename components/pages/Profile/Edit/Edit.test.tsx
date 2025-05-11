import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import EditProfileForm from "./Edit";
import toast from "react-hot-toast";

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../../../lib/supabaseClient", () => ({
  supabase: {
    auth: {
      getSession: vi.fn(() =>
        Promise.resolve({ data: { session: { access_token: "mock-token" } } })
      ),
    },
  },
}));

global.fetch = vi.fn((url) => {
  if (url === "/api/get-profile") {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          username: "john",
          email: "john@example.com",
          gender: "Male",
          location: "Ukraine, Kyiv",
          birth_date: "1990-01-15",
        }),
    });
  }

  if (url === "/api/edit-profile") {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });
  }

  return Promise.reject("Unknown endpoint");
}) as any;

describe("EditProfileForm", () => {
  it("renders loading spinner initially", async () => {
    render(<EditProfileForm />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument()
    );
  });

  it("loads form with fetched user data", async () => {
    render(<EditProfileForm />);
    await waitFor(() =>
      expect(screen.getByDisplayValue("john")).toBeInTheDocument()
    );
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(<EditProfileForm />);
    await waitFor(() => screen.getByText(/Edit Profile/i));

    fireEvent.change(screen.getByPlaceholderText("Your nickname"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      expect(screen.getByText(/Username is too short/)).toBeInTheDocument();
    });
  });

  it("submits form successfully", async () => {
  render(<EditProfileForm />);

  await screen.findByDisplayValue("john");

  fireEvent.click(screen.getByText("Male"));
  fireEvent.click(screen.getByText(/Save/i));

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith("Profile saved!");
  });
});
});
