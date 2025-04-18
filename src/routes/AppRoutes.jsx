import { createBrowserRouter, Outlet } from "react-router-dom";

// Components
import Layout from "../components/Layout";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import PublicProfile from "../pages/PublicProfile";
import ProfileEdit from "../components/ProfileEdit";
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

const RESERVED_ROUTES = ["dashboard", "login", "signup", "settings", "admin"];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "profile/edit", element: <ProfileEdit /> },
    ],
  },

  {
    path: "/:username",
    element: <MinimalLayout />,
    children: [
      {
        index: true,
        element: <PublicProfile />,
        loader: ({ params }) => {
          if (RESERVED_ROUTES.includes(params.username)) {
            throw new Response("", {
              status: 302,
              headers: { Location: "/" },
            });
          }
          return null;
        },
      },
    ],
  },
]);

export default router;
