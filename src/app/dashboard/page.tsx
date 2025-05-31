import { Metadata } from "next";
import React from "react";
import MealFormClient from "./page-client";

export const metadata: Metadata = {
  title: "Dashboard | CalorieTracker",
  description:
    "Track your daily nutrition, manage your meals, and monitor your health goals with CalorieTracker's intuitive dashboard.",
  keywords: [
    "calorie tracking",
    "nutrition dashboard",
    "meal tracking",
    "health goals",
    "diet management",
  ],
};

const Dashboard = () => {
  return <MealFormClient />;
};

export default Dashboard;
