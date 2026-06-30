import { Outlet } from "react-router-dom";
import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";

export function Layout() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <AppHeader />

      <main className="flex-grow-1 py-4">
        <Outlet />
      </main>

      <AppFooter />
    </div>
  );
}