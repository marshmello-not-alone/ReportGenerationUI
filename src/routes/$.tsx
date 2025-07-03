// src/routes/$.tsx (TanStack file routing for a "Not Found" fallback)
import { createFileRoute, redirect } from "@tanstack/react-router";
import { NotFoundError } from "@/components/ui/error"; // your custom 404 component

export const Route = createFileRoute("/$")({
  beforeLoad: async () => {
    const res = await fetch("/api/auth/profile", {
      credentials: "include",
    });

    if (!res.ok) {
      throw redirect({ to: "/login" });
    }

    return {};
  },
  component: () => <NotFoundError />,
});
