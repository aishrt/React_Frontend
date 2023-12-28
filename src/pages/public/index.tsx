import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import Landing from "./landing";
import Header from "../../layout/header";
import { Login } from "../auth/login";
import { Register } from "../auth/register";
import NotFound from "./notFound";

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
      { path: "/", element: <Landing /> },
      { path: "/login", element: <Login /> },
      { path: "/not-found", element: <NotFound /> },

      { path: "/register", element: <Register /> },

      { path: "*", element: <Navigate to="/not-found" /> },
    ],
  },
];
