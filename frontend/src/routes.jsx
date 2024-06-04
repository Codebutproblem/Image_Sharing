import Home from "./pages/Home";
import Uploader from "./pages/Uploader";
import PinByTopic from "./pages/PinByTopic";
import Login from "./pages/UserAccount/Login";
import Register from "./pages/UserAccount/Register";
import ForgotPassword from "./pages/UserAccount/ForgotPassword";
import DefaultLayout from "./pages/Layouts/DefaultLayout";
import UserAccountDefault from "./pages/Layouts/UserAccountDefault";

export const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {path: "", element: <Home />},
      {path: "topic", element: <PinByTopic />},
      { path: "upload", element: <Uploader /> }
    ],
  },
  {
    path: "/user-account",
    element: <UserAccountDefault />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {path: "forgot-password", element: <ForgotPassword />},
    ],
  },
];
