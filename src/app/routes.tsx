import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import SuperAdmin from "./pages/SuperAdmin";
import Entreprise from "./pages/Entreprise";
import Cabinet from "./pages/Cabinet";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/super-admin",
    Component: SuperAdmin,
  },
  {
    path: "/entreprise",
    Component: Entreprise,
  },
  {
    path: "/cabinet",
    Component: Cabinet,
  },
]);
