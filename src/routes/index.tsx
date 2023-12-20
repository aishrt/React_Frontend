import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { publicRoutes } from "../pages/public";
import { protectedRoutes } from "../pages/protected";
import Common from "../pages/public/common";
import storage from "../utils/storage";
import { useEffect, useState } from "react";
import axios from "axios";

export const AppRoutes = () => {
  const token = storage.getToken();
  // const [user, setUser] = useState<any>(null);
  // const getUser = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:4004/auth/me", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setUser(response?.data);
  //   } catch (error: any) {
  //     if (error.response) {
  //       const errorMessage = error.response.data.message;
  //       // toast.error(errorMessage);
  //       console.log(errorMessage);
  //     } else {
  //       console.log("An error occurred");
  //       // toast.error("An error occurred");
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     getUser();
  //   }
  // }, [token]);

  // console.log(user);
  const commonRoutes = [
    { path: "/", element: <Common /> },
    { path: "*", element: <Navigate to="/" /> },
  ];
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
