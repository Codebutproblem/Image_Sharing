import Home from "../pages/Home";
import Uploader from "../pages/Uploader";
import PinByTopic from "../pages/PinByTopic";
import Login from "../pages/UserAccount/Login";
import Register from "../pages/UserAccount/Register";
import ForgotPassword from "../pages/UserAccount/ForgotPassword";
import DefaultLayout from "../layouts/DefaultLayout";
import UserAccountDefault from "../layouts/UserAccountDefault";
import PinDetail from "../pages/PinDetail";
import Profile from "../pages/Profile";
import PinEdit from "../pages/PinEdit";

const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "topic", element: <PinByTopic /> },
      { path: "upload", element: <Uploader /> },
      { path: "pin-detail/:slug", element: <PinDetail /> },
      { path: "profile/:slug", element: <Profile />},
      { path: "profile/edit-pin/:slug", element: <PinEdit />},
    ],
  },
  {
    path: "/user-account",
    element: <UserAccountDefault />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
];

export default routes;
