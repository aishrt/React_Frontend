import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { publicRoutes } from "../pages/public";
import { protectedRoutes } from "../pages/protected";
import NotFound from "../pages/public/notFound";
import storage from "../utils/storage";

export const AppRoutes = () => {
  const token = storage.getToken();

  const commonRoutes = [
    { path: "/", element: <NotFound /> },
    { path: "*", element: <Navigate to="/" /> },
  ]; // These are routes which are accessible  , with or without token

  let allRoutes: RouteObject[] = [];

  if (token) {
    allRoutes = [...protectedRoutes];
  } else {
    allRoutes = [...publicRoutes];
  }

  allRoutes = [...allRoutes, ...commonRoutes];
  const element = useRoutes(allRoutes);

  return <>{element}</>;
};
