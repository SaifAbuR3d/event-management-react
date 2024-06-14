import AdminDrawer from "../other/AdminDashboardComponents/AdminDrawer";
import AdminNavbar from "../other/AdminDashboardComponents/AdminNavbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
      <AdminDrawer />
    </>
  );
}
