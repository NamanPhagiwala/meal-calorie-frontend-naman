import { ThemeProvider } from "@/components/themeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CalorieTracker - Track Your Nutrition & Health Goals",
    template: "%s | CalorieTracker",
  },
  description:
    "Track your daily nutrition, manage your meals, and achieve your health goals with CalorieTracker's intuitive platform.",
  keywords: [
    "calorie tracking",
    "nutrition",
    "health",
    "diet",
    "weight management",
    "meal tracking",
  ],
  authors: [{ name: "Naman Phagiwala" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
