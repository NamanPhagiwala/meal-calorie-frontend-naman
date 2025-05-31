import { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Create Account | CalorieTracker",
  description:
    "Create your CalorieTracker account to start tracking your nutrition and achieving your health goals.",
  keywords: [
    "calorie tracking",
    "nutrition",
    "health",
    "diet",
    "weight management",
    "sign up",
    "register",
  ],
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
