import { createBrowserRouter } from "react-router";

import Register from "../features/auth/pages/Register";
import Dashboard from "../features/chats/pages/Dashboard";
import { Protected } from "../features/auth/components/Protected";
import Login from "../features/auth/pages/login";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Dashboard />,
  },
]);
