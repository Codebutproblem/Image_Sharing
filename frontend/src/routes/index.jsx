
import UserAccountDefault from "../layouts/UserAccountDefault";
import DefaultLayout from "../layouts/default";
import Home from "../pages/Home";
import Login from "../pages/Login";

import Register from "../pages/Register";
import Uploader from "../pages/Uploader";

export const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "upload", element: <Uploader /> }
    ],
  },
  {
    path: "/user-account",
    element: <UserAccountDefault />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
];
