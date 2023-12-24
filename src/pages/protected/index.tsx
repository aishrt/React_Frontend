import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import MyProfile from "./myProfile";
import Header from "../../layout/header";
import NotFound from "../public/notFound";
import UserList from "./userList";
import EditUser from "./editUser";

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
      { path: "/profile", element: <MyProfile /> },
      { path: "/not-found", element: <NotFound /> },
      { path: "/user-list", element: <UserList /> },
      { path: "/user-edit/:id", element: <EditUser /> },
      { path: "*", element: <Navigate to="/not-found" /> },
    ],
  },
];
