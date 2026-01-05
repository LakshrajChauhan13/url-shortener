import { createRoute } from "@tanstack/react-router";
import AuthPage from "../pages/AuthPage";
import { ifAuthenticated } from "../utils/helper";

export const createAuthPageRoute = (rootRoute) => createRoute({
    getParentRoute : () => rootRoute,
    path : '/auth',
    component : AuthPage,
    beforeLoad: ifAuthenticated
})