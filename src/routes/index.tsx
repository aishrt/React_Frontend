import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { publicRoutes } from "../pages/public";
import { protectedRoutes } from "../pages/protected";
import Common from "../pages/public/common";

export const AppRoutes = () => {
  const user = localStorage.getItem("user");

  const commonRoutes = [
    { path: "/", element: <Common /> },
    { path: "/*", element: <Navigate to="/" /> },
  ];
  let allRoutes: RouteObject[] = [];
  if (user) {
    allRoutes = [...protectedRoutes];
  } else {
    allRoutes = [...publicRoutes];
  }
  allRoutes = [...allRoutes, ...commonRoutes];
  const element = useRoutes(allRoutes);

  return <>{element}</>;
};
