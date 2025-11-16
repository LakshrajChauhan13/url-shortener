import { createRoute } from "@tanstack/react-router";
import DashBoardPage from "../pages/DashBoardPage";
import { checkAuth } from "../utils/helper";

export const createDashBoardPageRoute = (rootRoute) => createRoute({
    getParentRoute : () => rootRoute,
    path : '/dashboard',
    component : DashBoardPage,
    beforeLoad: checkAuth,
})