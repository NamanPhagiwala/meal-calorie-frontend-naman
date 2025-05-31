"use client";
import { Button } from "@/components/ui/button";
import { LogOut, Calculator, History } from "lucide-react";
import { CalorieForm } from "@/components/CalorieForm";
import { CalorieResults } from "@/components/CalorieResults";
import { MealHistory } from "@/components/MealHistory";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useAuthStore } from "@/store/AuthStore";
import { ThemeToggle } from "@/components/theme-toggle";

interface CalorieData {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  source: string;
  timestamp: string;
}

export default function MealFormClient() {
  const [currentView, setCurrentView] = useState<"calculator" | "history">(
    "calculator"
  );
  const [calorieResults, setCalorieResults] = useState<CalorieData | null>(
    null
  );
  const [mealHistory, setMealHistory] = useState<CalorieData[]>([]);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthGuard();
  const { removeToken } = useAuthStore();

  const handleLogout = () => {
    removeToken();
    setCalorieResults(null);
    setMealHistory([]);
    router.push("/login");
  };

  const handleCalorieResult = (data: CalorieData) => {
    data.timestamp = String(new Date());
    setCalorieResults(data);
    setMealHistory((prev) => [data, ...prev]);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex sm:flex-row sm:items-center sm:justify-between justify-between gap-3 sm:gap-0">
            <div className="flex items-center space-x-2">
              <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-teal-600 dark:from-purple-400 dark:via-pink-400 dark:to-teal-400 bg-clip-text text-transparent">
                CalorieTracker
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">
                Welcome!
              </span>
              <div className="flex items-center gap-2 sm:gap-4">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView("calculator")}
                  className={`flex-1 sm:flex hidden hover:bg-accent ${
                    currentView === "calculator" && "text-primary"
                  }`}
                >
                  <Calculator className="h-4 w-4 mr-2 sm:mr-0" />
                  <span className="hidden sm:inline">Calculator</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView("history")}
                  className={`flex-1 sm:flex hidden hover:bg-accent ${
                    currentView === "history" && "text-primary"
                  }`}
                >
                  <History className="h-4 w-4 mr-2 sm:mr-0" />
                  <span className="hidden sm:inline">History</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-border hover:bg-accent"
                >
                  <LogOut className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
        <div className="flex py-4 sm:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("calculator")}
            className={`flex-1 sm:flex-none ${
              currentView === "calculator"
                ? "bg-accent text-primary"
                : "hover:bg-accent"
            }`}
          >
            <Calculator className="h-4 w-4 mr-2 sm:mr-0" />
            <span className="">Calculator</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("history")}
            className={`flex-1 sm:flex-none ${
              currentView === "history"
                ? "bg-accent text-primary"
                : "hover:bg-accent"
            }`}
          >
            <History className="h-4 w-4 mr-2 sm:mr-0" />
            <span className="">History</span>
          </Button>
        </div>
        {currentView === "calculator" ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <CalorieForm onResult={handleCalorieResult} />
            </div>
            <div>
              {calorieResults && <CalorieResults data={calorieResults} />}
            </div>
          </div>
        ) : (
          <MealHistory meals={mealHistory} />
        )}
      </main>
    </div>
  );
}
