import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import PublicProfile from "../pages/PublicProfile";
import ProfileEdit from "../components/ProfileEdit";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import FAQ from "../pages/FAQ";
import ForgotPassword from "../components/ForgotPassword";
import EmailVerification from "../components/EmailVerification";
import AuthAction from "../components/AuthAction";
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

const RESERVED_ROUTES = [
  "dashboard",
  "login",
  "signup",
  "settings",
  "admin",
  "about",
  "contact",
  "terms",
  "privacy",
  "faq",
  "forgot-password",
  "verify-email",
  "auth",
];

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
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verify-email", element: <EmailVerification /> },
      { path: "auth/action", element: <AuthAction /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "terms", element: <Terms /> },
      { path: "privacy", element: <Privacy /> },
      { path: "faq", element: <FAQ /> },
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
