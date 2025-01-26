import { createLazyFileRoute } from "@tanstack/react-router";
import Feed from "../components/Feed";

export const Route = createLazyFileRoute("/")({
  component: Feed,
});
