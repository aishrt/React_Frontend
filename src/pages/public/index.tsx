import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import Landing from "./landing";
import Common from "./common";
import Header from "../../layout/header";

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

export const publicRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Landing /> },
      { path: "/not-found", element: <Common /> },
      { path: "*", element: <Navigate to="/not-found" /> },
    ],
  },
];
