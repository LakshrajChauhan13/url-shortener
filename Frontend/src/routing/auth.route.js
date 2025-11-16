import { createRoute } from "@tanstack/react-router";
import AuthPage from "../pages/AuthPage";

export const createAuthPageRoute = (rootRoute) => createRoute({
    getParentRoute : () => rootRoute,
    path : '/auth',
    component : AuthPage

})