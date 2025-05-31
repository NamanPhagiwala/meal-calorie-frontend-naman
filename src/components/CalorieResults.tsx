"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Hash, Calculator, Flame, Database } from "lucide-react";
import { Label } from "@/components/ui/label";

export interface CalorieResultsProps {
  data: {
    dish_name: string;
    servings: number;
    calories_per_serving: number;
    total_calories: number;
    source: string;
    timestamp: string;
  };
}

export const CalorieResults = ({ data }: CalorieResultsProps) => {
  return (
    <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5 text-primary" />
          <span>Calorie Results</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Dish Name</Label>
              <div className="flex items-center space-x-2">
                <Utensils className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{data.dish_name}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Servings</Label>
              <div className="flex items-center space-x-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{data.servings}</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Total Calories
              </Label>
              <div className="flex items-center space-x-2">
                <Flame className="h-4 w-4 text-primary" />
                <span className="font-medium">{data.total_calories} kcal</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Calories per Serving
              </Label>
              <div className="flex items-center space-x-2">
                <Calculator className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  {data.calories_per_serving} kcal
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>Data Source: {data.source}</span>
          </div>
          <span>{new Date(data.timestamp).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};
