import React, { useState } from "react";
import AdminDrawer from "../other/AdminDrawer";
import AdminNavbar from "../other/AdminNavbar";
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
