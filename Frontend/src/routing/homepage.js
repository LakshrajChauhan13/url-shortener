import { createRoute } from "@tanstack/react-router";
import HomePage from "../pages/HomePage";
import Homepage2 from "@/pages/Homepage2";

export const createHomePageRoute = (rootRoute) => createRoute({
    getParentRoute : () => rootRoute,
    path : '/',
    component : HomePage
})

