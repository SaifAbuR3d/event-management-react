import Navbar from "../../components/other/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../other/Footer.jsx";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
