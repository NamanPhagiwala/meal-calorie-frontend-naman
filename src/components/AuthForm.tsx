"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/AuthStore";
import { useState } from "react";
import { LogIn, UserPlus, Calculator } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
}

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError: setFormError,
    clearErrors,
    trigger,
  } = useForm<AuthFormData>();
  const isRegisterMode = mode === "register";
  const setToken = useAuthStore(
    (state: { setToken: (token: string) => void }) => state.setToken
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (isRegisterMode && confirmPassword) {
      if (password !== confirmPassword) {
        setFormError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
      } else {
        clearErrors("confirmPassword");
      }
    }
  }, [password, confirmPassword, isRegisterMode, setFormError, clearErrors]);

  const onSubmit = async (data: AuthFormData) => {
    try {
      setIsLoading(true);
      setError(undefined);
      const res =
        mode === "login" ? await loginUser(data) : await registerUser(data);

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Authentication failed");
        return;
      }

      const responseData = await res.json();
      setToken(responseData.token);
      router.push("/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-teal-600 dark:from-purple-400 dark:via-pink-400 dark:to-teal-400 bg-clip-text text-transparent">
              CalorieTracker
            </h1>
          </div>
          <p className="text-muted-foreground">
            {isRegisterMode
              ? "Start your health journey today"
              : "Welcome back to your health journey"}
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center space-x-2">
              {isRegisterMode ? (
                <>
                  <UserPlus className="h-6 w-6 text-primary" />
                  <span>Create Account</span>
                </>
              ) : (
                <>
                  <LogIn className="h-6 w-6 text-primary" />
                  <span>Sign In</span>
                </>
              )}
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {isRegisterMode
                ? "Enter your information to create your account"
                : "Enter your credentials to access your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {isRegisterMode && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">
                      First Name
                    </Label>
                    <Input
                      {...register("firstName", {
                        required: mode === "register",
                        onChange: () => trigger("firstName"),
                      })}
                      id="firstName"
                      type="text"
                      placeholder="John"
                      disabled={isLoading}
                      className="bg-background"
                      required
                      data-testid="first-name-input"
                    />
                    {errors.firstName && (
                      <p
                        className="text-sm text-destructive"
                        data-testid="first-name-error"
                      >
                        First name is required
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      {...register("lastName", {
                        required: mode === "register",
                        onChange: () => trigger("lastName"),
                      })}
                      disabled={isLoading}
                      className="bg-background"
                      required
                      data-testid="last-name-input"
                    />
                    {errors.lastName && (
                      <p
                        className="text-sm text-destructive"
                        data-testid="last-name-error"
                      >
                        Last name is required
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    onChange: () => trigger("email"),
                  })}
                  disabled={isLoading}
                  className="bg-background"
                  required
                  data-testid="email-input"
                />
                {errors.email && (
                  <p
                    className="text-sm text-destructive"
                    data-testid="email-error"
                  >
                    {errors.email.type === "required"
                      ? "Email is required"
                      : "Invalid email address"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    onChange: () => trigger("password"),
                  })}
                  disabled={isLoading}
                  className="bg-background"
                  required
                  data-testid="password-input"
                />
                {errors.password && (
                  <p
                    className="text-sm text-destructive"
                    data-testid="password-error"
                  >
                    {errors.password.type === "required"
                      ? "Password is required"
                      : "Password must be at least 6 characters"}
                  </p>
                )}
              </div>

              {isRegisterMode && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword", {
                      required: isRegisterMode,
                      onChange: () => trigger("confirmPassword"),
                    })}
                    disabled={isLoading}
                    className="bg-background"
                    required
                    data-testid="confirm-password-input"
                  />
                  {errors.confirmPassword && (
                    <p
                      className="text-sm text-destructive"
                      data-testid="confirm-password-error"
                    >
                      {errors.confirmPassword.message ||
                        "Please confirm your password"}
                    </p>
                  )}
                </div>
              )}

              {error && (
                <div
                  className="text-sm text-destructive text-center"
                  data-testid="form-error"
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={isLoading}
                data-testid="submit-button"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>
                      {isRegisterMode ? "Creating Account..." : "Signing In..."}
                    </span>
                  </div>
                ) : isRegisterMode ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isRegisterMode ? (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/login")}
                      className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
                    >
                      Sign in here
                    </button>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/register")}
                      className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
                    >
                      Create one here
                    </button>
                  </>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
