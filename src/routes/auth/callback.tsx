// src/routes/auth/callback.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { queryClient } from "@/main"; // or wherever your React Query client is

export const Route = createFileRoute("/auth/callback")({
  beforeLoad: async () => {
    // Optional: revalidate auth query after backend set the cookie
    await queryClient.invalidateQueries({ queryKey: ["auth"] });

    // Redirect user to the dashboard
    throw redirect({ to: "/user/dashboard" });
  },
  component: () => {
    return <p>Logging you in...</p>; // Optional loading UI
  },
});
