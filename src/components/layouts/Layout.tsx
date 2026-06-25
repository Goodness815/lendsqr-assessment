import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import s from "./Layout.module.scss";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={s.layout}>
      <Topbar sidebarOpen={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={s.main}>
        <div className={s.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
