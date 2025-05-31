import { AuthFormData } from "@/components/AuthForm";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (data: AuthFormData) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

export const loginUser = async (data: AuthFormData) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return res;
};

interface CalorieRequest {
  dish_name: string;
  servings: number;
}

export const getCalories = async (data: CalorieRequest, token: string) => {
  const res = await fetch(`${API}/get-calories`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
