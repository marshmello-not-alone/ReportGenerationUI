import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const res = await fetch("/api/auth/profile", {
      credentials: "include",
    });

    if (res.ok) {
      throw redirect({ to: "/user/dashboard" }); // ✅ user is logged in
    }

    throw redirect({ to: "/login" }); // ❌ user is not logged in
  },
  component: () => null,
});
