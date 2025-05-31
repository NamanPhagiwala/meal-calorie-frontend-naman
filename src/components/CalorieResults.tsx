"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Hash, Zap, Database, CheckCircle } from "lucide-react";

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
    <Card className="border-0 h-full shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-teal-600" />
            <span>Calorie Results</span>
          </CardTitle>
          <Badge variant="secondary" className="bg-teal-100 text-teal-700">
            Success
          </Badge>
        </div>
        <CardDescription>Nutritional information for your meal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Utensils className="h-4 w-4" />
              <span>Dish Name</span>
            </div>
            <p className="text-lg font-semibold capitalize">
              {data?.dish_name}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Hash className="h-4 w-4" />
              <span>Servings</span>
            </div>
            <p className="text-lg font-semibold">{data?.servings}</p>
          </div>
        </div>

        <div className="bg-white/60 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-1">
                <Zap className="h-4 w-4" />
                <span>Per Serving</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {data?.calories_per_serving}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  cal
                </span>
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-1">
                <Zap className="h-4 w-4" />
                <span>Total Calories</span>
              </div>
              <p className="text-3xl font-bold text-teal-600">
                {data?.total_calories}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  cal
                </span>
              </p>
            </div>
          </div>

          {data?.servings > 1 && (
            <div className="text-center text-sm text-gray-600 pt-2 border-t border-gray-200">
              {data?.calories_per_serving} × {data?.servings} ={" "}
              {data?.total_calories} calories
            </div>
          )}
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
