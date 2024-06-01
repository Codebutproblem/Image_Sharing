import DefaultLayout from "./layouts/DefaultLayout";
import UserAccountDefault from "./layouts/UserAccountDefault";
import Home from "./pages/Home";
import TopicPin from "./pages/TopicPin";
import Uploader from "./pages/Uploader";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {path: "", element: <Home />},
      {path: "topic", element: <TopicPin />},
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
