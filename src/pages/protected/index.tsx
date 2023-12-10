import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import MyProfile from "./myProfile";
import Header from "../../layout/header";
import Common from "../public/common";

const App = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="w-screen h-screen alignmentLogo">Any Image Here</div>
        }
      >
        <Header />
        <Outlet></Outlet>
      </Suspense>
    </div>
  );
};

export const protectedRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <MyProfile /> },
      { path: "/not-found", element: <Common /> },
      { path: "*", element: <Navigate to="/not-found" /> },
    ],
  },
];
