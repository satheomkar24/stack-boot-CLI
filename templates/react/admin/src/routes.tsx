import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy } from "react";

import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import { AuthRouteRedirect } from "./guards/AuthRouteRedirect";
import { AuthGuard } from "./guards/AuthGuard";
import Profile from "./pages/Profile";
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        Component: Home,
      },
      // ============= remove this and add your routes
      {
        path: "courses",
        children: [
          {
            path: "all",
            element: "all",
          },
          {
            path: "add",
            element: "add",
          },
        ],
      },
      {
        path: "users",
        element: "users",
      },
      // =============
    ],
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout showSidebar={false} />
      </AuthGuard>
    ),
    children: [
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
  {
    path: "auth",
    element: (
      <AuthRouteRedirect>
        <Outlet />
      </AuthRouteRedirect>
    ),
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "reset-password/:token",
        Component: ResetPassword,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default routes;
