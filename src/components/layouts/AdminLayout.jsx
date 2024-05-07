import React from "react";
import AdminDrawer from "../other/AdminDashboardComponents/AdminDrawer";
import AdminNavbar from "../other/AdminDashboardComponents/AdminNavbar";
import { Outlet } from "react-router-dom";
import { DrawerProvider } from "../../contexts/DrawerContext";

export default function AdminLayout() {
  return (
    <DrawerProvider>
      <AdminNavbar />
      <Outlet />
      <AdminDrawer />
    </DrawerProvider>
  );
}
