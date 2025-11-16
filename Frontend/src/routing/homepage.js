import { createRoute } from "@tanstack/react-router";
import HomePage from "../pages/HomePage";

export const createHomePageRoute = (rootRoute) => createRoute({
    getParentRoute : () => rootRoute,
    path : '/',
    component : HomePage
})