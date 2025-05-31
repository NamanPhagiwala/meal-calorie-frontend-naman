import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AuthForm from "../AuthForm";
import { loginUser } from "@/lib/api";
import userEvent from "@testing-library/user-event";

// Mock the router before any tests
const mockRouter = {
  push: vi.fn(),
};

vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

vi.mock("@/lib/api", () => {
  const mockLoginResponse = new Response(
    JSON.stringify({ token: "fake-token" }),
    {
      status: 200,
      statusText: "OK",
      headers: { "Content-Type": "application/json" },
    }
  );

  const mockRegisterResponse = new Response(
    JSON.stringify({ token: "fake-token" }),
    {
      status: 200,
      statusText: "OK",
      headers: { "Content-Type": "application/json" },
    }
  );

  return {
    loginUser: vi.fn().mockResolvedValue(mockLoginResponse),
    registerUser: vi.fn().mockResolvedValue(mockRegisterResponse),
  };
});

describe("AuthForm", () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
  });

  it("renders login form correctly", () => {
    render(<AuthForm mode="login" />);

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("renders register form correctly", () => {
    render(<AuthForm mode="register" />);

    expect(screen.getByTestId("first-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("last-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("validates required fields in register mode", async () => {
    render(<AuthForm mode="register" />);

    await userEvent.click(screen.getByTestId("submit-button"));
  });

  it("validates email format", async () => {
    render(<AuthForm mode="login" />);

    await userEvent.type(screen.getByTestId("email-input"), "invalid-email");
    await userEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("email-error")).toBeInTheDocument();
  });

  it("validates password length", async () => {
    render(<AuthForm mode="login" />);

    await userEvent.type(screen.getByTestId("password-input"), "12345");
    await userEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("password-error")).toBeInTheDocument();
  });

  it("validates password confirmation", async () => {
    render(<AuthForm mode="register" />);

    await userEvent.type(screen.getByTestId("password-input"), "password123");
    await userEvent.type(
      screen.getByTestId("confirm-password-input"),
      "password456"
    );
    await userEvent.click(screen.getByTestId("submit-button"));
  });

  it("handles successful login", async () => {
    render(<AuthForm mode="login" />);

    await userEvent.type(screen.getByTestId("email-input"), "test@example.com");
    await userEvent.type(screen.getByTestId("password-input"), "password123");
    await userEvent.click(screen.getByTestId("submit-button"));

    expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
  });

  it("handles successful registration", async () => {
    render(<AuthForm mode="register" />);

    await userEvent.type(screen.getByTestId("first-name-input"), "John");
    await userEvent.type(screen.getByTestId("last-name-input"), "Doe");
    await userEvent.type(screen.getByTestId("email-input"), "test@example.com");
    await userEvent.type(screen.getByTestId("password-input"), "password123");
    await userEvent.type(
      screen.getByTestId("confirm-password-input"),
      "password123"
    );
    await userEvent.click(screen.getByTestId("submit-button"));

    expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
  });

  it("handles API error during login", async () => {
    vi.mocked(loginUser).mockResolvedValueOnce(
      new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      })
    );

    render(<AuthForm mode="login" />);

    await userEvent.type(screen.getByTestId("email-input"), "test@example.com");
    await userEvent.type(screen.getByTestId("password-input"), "password123");
    await userEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("form-error")).toBeInTheDocument();
    expect(screen.getByTestId("form-error")).toHaveTextContent(
      "Invalid credentials"
    );
  });
});
