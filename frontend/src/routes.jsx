import DefaultLayout from "./layouts/DefaultLayout";
import UserAccountDefault from "./layouts/UserAccountDefault";
import Home from "./pages/Home";
import Uploader from "./pages/Uploader";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PinByTopic from "./pages/PinByTopic";

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
    ],
  },
];
