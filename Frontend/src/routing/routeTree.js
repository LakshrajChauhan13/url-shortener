import AppRootLayout from "../AppRootLayout.jsx";
import { createRootRoute } from "@tanstack/react-router";
import { createHomePageRoute } from "./homepage.js";
import { createAuthPageRoute } from "./auth.route.js";
import { createDashBoardPageRoute } from "./DashBoardPage.js";

export const rootRoute = createRootRoute({
  component: AppRootLayout,
})

const homePageRoute = createHomePageRoute(rootRoute);
const authPageRoute = createAuthPageRoute(rootRoute);
const dashboardPageRoute = createDashBoardPageRoute(rootRoute);

export const routeTree = rootRoute.addChildren([ homePageRoute , authPageRoute , dashboardPageRoute ])
