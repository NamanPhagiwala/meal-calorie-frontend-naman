import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Loader, Utensils, Hash } from "lucide-react";
import { getCalories } from "@/lib/api";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/AuthStore";

interface CalorieFormProps {
  onResult: (data: {
    dish_name: string;
    servings: number;
    calories_per_serving: number;
    total_calories: number;
    source: string;
    timestamp: string;
  }) => void;
}
export interface CalorieFormSchema {
  dish_name: string;
  servings: number;
}
export const CalorieForm = ({ onResult }: CalorieFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const authStore = useAuthStore();
  const { register, handleSubmit, getValues, reset, setValue } =
    useForm<CalorieFormSchema>();
  const onSubmit = async () => {
    setIsLoading(true);
    const value = getValues();
    const payload = {
      dish_name: value.dish_name,
      servings: Number(value.servings),
    };
    const token = authStore.token;
    if (token)
      try {
        const res = await getCalories(payload, token);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to get calories");
        }
        const caloriesPerServing = await res.json();
        if (!caloriesPerServing) {
          toast("Dish not found", {
            description:
              "Try searching for common dishes like 'chicken biryani', 'pizza', or 'apple'",
          });
          return;
        }
        console.log(res.formData);

        onResult(caloriesPerServing);

        reset();
      } catch (error) {
        console.error("Error getting calories:", error);
        toast("Error calculating calories", {
          description: "Please try again later",
        });
      } finally {
        setIsLoading(false);
      }
  };

  const popularDishes = [
    "Chicken Biryani",
    "Pizza",
    "Burger",
    "Pasta",
    "Salad",
    "Apple",
    "Banana",
    "Chicken Breast",
    "Rice",
    "Dosa",
  ];

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-green-600" />
          <span>Calorie Calculator</span>
        </CardTitle>
        <CardDescription>
          Enter a dish name and serving size to calculate calories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dishName">Dish Name</Label>
            <div className="relative">
              <Utensils className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="dishName"
                type="text"
                placeholder="e.g., Chicken Biryani"
                {...register("dish_name", { required: true })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="servings">Number of Servings</Label>
            <div className="relative">
              <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="servings"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="1"
                {...register("servings", { required: true })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Get Calories
              </>
            )}
          </Button>
        </form>

        <div className="mt-6">
          <Label className="text-sm text-gray-600 mb-2 block">
            Popular dishes to try:
          </Label>
          <div className="flex flex-wrap gap-2">
            {popularDishes.map((dish) => (
              <Button
                key={dish}
                variant="outline"
                size="sm"
                onClick={() => setValue("dish_name", dish)}
                className="text-xs hover:bg-green-50 hover:border-green-300"
              >
                {dish}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
