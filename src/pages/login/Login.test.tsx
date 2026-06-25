// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LogIn } from "./LogIn";
import { useAuth } from "../../hooks/useAuth";

vi.mock("../../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

const mockLogin = vi.fn();

describe("LogIn", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      login: mockLogin,
      logout: vi.fn(),
      loading: false,
      isAuthenticated: false,
    });
    mockLogin.mockClear();
  });

  it("renders the login form with all required elements", () => {
    render(<LogIn />);
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
    expect(screen.getByTestId("button-login")).toBeInTheDocument();
    expect(screen.getByTestId("button-toggle-password")).toBeInTheDocument();
    expect(screen.getByTestId("button-forgot-password")).toBeInTheDocument();
  });

  it("has correct input types by default", () => {
    render(<LogIn />);
    expect(screen.getByTestId("input-email")).toHaveAttribute("type", "email");
    expect(screen.getByTestId("input-password")).toHaveAttribute("type", "password");
  });

  it("shows error when submitted with both fields empty", async () => {
    render(<LogIn />);
    await userEvent.click(screen.getByTestId("button-login"));
    expect(screen.getByText("Please enter your email and password.")).toBeInTheDocument();
  });

  it("shows error when only email is filled", async () => {
    render(<LogIn />);
    await userEvent.type(screen.getByTestId("input-email"), "test@example.com");
    await userEvent.click(screen.getByTestId("button-login"));
    expect(screen.getByText("Please enter your email and password.")).toBeInTheDocument();
  });

  it("shows error when only password is filled", async () => {
    render(<LogIn />);
    await userEvent.type(screen.getByTestId("input-password"), "password123");
    await userEvent.click(screen.getByTestId("button-login"));
    expect(screen.getByText("Please enter your email and password.")).toBeInTheDocument();
  });

  it("clears error when user starts typing after a failed attempt", async () => {
    render(<LogIn />);
    await userEvent.click(screen.getByTestId("button-login"));
    expect(screen.getByText("Please enter your email and password.")).toBeInTheDocument();
    await userEvent.type(screen.getByTestId("input-email"), "a");
    expect(screen.queryByText("Please enter your email and password.")).not.toBeInTheDocument();
  });

  it("toggles password field from password to text", async () => {
    render(<LogIn />);
    const passwordInput = screen.getByTestId("input-password");
    const toggleBtn = screen.getByTestId("button-toggle-password");

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(toggleBtn).toHaveTextContent("SHOW");

    await userEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(toggleBtn).toHaveTextContent("HIDE");

    await userEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(toggleBtn).toHaveTextContent("SHOW");
  });

  it("calls login() from context on successful submission", async () => {
    render(<LogIn />);
    await userEvent.type(screen.getByTestId("input-email"), "admin@lendsqr.com");
    await userEvent.type(screen.getByTestId("input-password"), "anypassword");
    await userEvent.click(screen.getByTestId("button-login"));

    expect(mockLogin).toHaveBeenCalled();
  });

  it("does not call login() on empty submission", async () => {
    render(<LogIn />);
    await userEvent.click(screen.getByTestId("button-login"));
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("form can be submitted via Enter key", async () => {
    render(<LogIn />);
    await userEvent.type(screen.getByTestId("input-email"), "admin@lendsqr.com");
    await userEvent.type(screen.getByTestId("input-password"), "anypassword");
    fireEvent.submit(screen.getByTestId("input-password").closest("form")!);

    expect(mockLogin).toHaveBeenCalled();
  });

  it("does not show error message initially", () => {
    render(<LogIn />);
    expect(screen.queryByText("Please enter your email and password.")).not.toBeInTheDocument();
  });

  it("disables the submit button and shows loading text while authenticating", () => {
    vi.mocked(useAuth).mockReturnValue({
      login: mockLogin,
      logout: vi.fn(),
      loading: true,
      isAuthenticated: false,
    });
    
    render(<LogIn />);
    const submitBtn = screen.getByTestId("button-login");
    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveTextContent("Logging in...");
  });
});
