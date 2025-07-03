import { queryClient } from "@/main";

export async function logout() {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  // Clear auth cache
  await queryClient.invalidateQueries({ queryKey: ["auth"] });
}
