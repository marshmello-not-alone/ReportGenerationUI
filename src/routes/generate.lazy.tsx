import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/generate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/generate"!</div>
}
