import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, Utensils, Calendar, Zap } from "lucide-react";

interface MealHistoryProps {
  meals: Array<{
    dish_name: string;
    servings: number;
    calories_per_serving: number;
    total_calories: number;
    source: string;
    timestamp: string;
  }>;
}

export const MealHistory = ({ meals }: MealHistoryProps) => {
  if (meals.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-5 w-5 text-green-600" />
            <span>Meal History</span>
          </CardTitle>
          <CardDescription>
            Your calorie lookup history will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Utensils className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No meals tracked yet</p>
            <p className="text-sm text-gray-400 mt-2">
              Use the calculator to start tracking your meals
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalCalories = meals.reduce(
    (sum, meal) => sum + meal.total_calories,
    0
  );

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-xl bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Today Summary</h3>
            <p className="text-3xl font-bold">
              {totalCalories}
              <span className="text-sm font-normal ml-1">calories</span>
            </p>
            <p className="text-sm opacity-90 mt-1">
              {meals.length} meal{meals.length !== 1 ? "s" : ""} tracked
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-5 w-5 text-green-600" />
            <span>Meal History</span>
          </CardTitle>
          <CardDescription>Your recent calorie lookups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meals.map((meal, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white/60 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Utensils className="h-4 w-4 text-gray-400" />
                    <h4 className="font-semibold capitalize">
                      {meal.dish_name}
                    </h4>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-x-4 text-sm text-gray-600">
                    <span>
                      {meal.servings} serving{meal.servings !== 1 ? "s" : ""}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(meal.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="hidden sm:inline">•</span>
                    <span>
                      {new Date(meal.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:inline text-right">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 mb-1"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    {meal.total_calories} cal
                  </Badge>
                  <p className="text-xs text-gray-500">
                    {meal.calories_per_serving} cal/serving
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
