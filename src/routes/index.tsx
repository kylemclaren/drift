import { createFileRoute } from "@tanstack/react-router";
import { Flow } from "@/components/flow";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return <Flow />;
}