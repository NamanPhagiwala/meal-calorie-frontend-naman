import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { History, Clock } from "lucide-react";

export interface MealHistoryProps {
  meals: Array<{
    dish_name: string;
    servings: number;
    total_calories: number;
    calories_per_serving: number;
    timestamp: string;
  }>;
}

export const MealHistory = ({ meals }: MealHistoryProps) => {
  return (
    <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="h-5 w-5 text-primary" />
          <span>Meal History</span>
        </CardTitle>
        <CardDescription>
          Your recent calorie calculations and meal records
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No meals recorded yet. Start by calculating calories for a dish!
            </div>
          ) : (
            meals.map((meal) => (
              <div
                key={meal.timestamp}
                className="p-4 rounded-lg border bg-background/50 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium capitalize">{meal.dish_name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {new Date(meal.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Servings:</span>{" "}
                    <span className="font-medium">{meal.servings}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Per Serving:</span>{" "}
                    <span className="font-medium">
                      {meal.calories_per_serving} kcal
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">
                      Total Calories:
                    </span>{" "}
                    <span className="font-medium">
                      {meal.total_calories} kcal
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
