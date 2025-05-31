import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";

export function useAuthGuard() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    if (!token) {
      router.push("/login");
    }
    setIsLoading(false);
  }, [token, router]);

  return { isAuthenticated: !!token, isLoading };
}
