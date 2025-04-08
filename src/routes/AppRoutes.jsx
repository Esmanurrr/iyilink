import { createBrowserRouter } from "react-router-dom";

// Components
import Layout from "../components/Layout";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import { AuthProvider } from "../contexts/AuthContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

export default router;
