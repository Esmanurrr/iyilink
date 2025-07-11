import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-dark-text)",
      }}
    >
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
