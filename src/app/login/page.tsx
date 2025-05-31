import { Metadata } from "next";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = {
  title: "Sign In | CalorieTracker",
  description:
    "Sign in to your CalorieTracker account to manage your nutrition and health goals.",
  keywords: [
    "calorie tracking",
    "nutrition",
    "health",
    "diet",
    "weight management",
    "login",
  ],
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
