import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({
  component: () => (
    <Box sx={{ height: "100%", background: "#F6F7F7" }}>
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </Box>
  ),
});
