import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/analytics")({
  component: Analytics,
});

function Analytics() {
  return <div className="p-2">Hello from analytics</div>;
}
