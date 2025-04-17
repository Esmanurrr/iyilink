import { createBrowserRouter, Outlet } from "react-router-dom";

// Components
import Layout from "../components/Layout";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import PublicProfile from "../pages/PublicProfile";
import { AuthProvider } from "../contexts/AuthContext";

const MainLayout = () => (
  <AuthProvider>
    <Layout />
  </AuthProvider>
);

const MinimalLayout = () => (
  <div
    className="minimal-layout"
    style={{
      minHeight: "100vh",
      backgroundColor: "var(--color-background)",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Outlet />
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },

  {
    path: "/",
    element: <MinimalLayout />,
    children: [
      {
        path: ":username",
        element: <PublicProfile />,
      },
    ],
  },
]);

export default router;
