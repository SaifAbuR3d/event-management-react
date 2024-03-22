import React from "react";
import Navbar from "../../components/other/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../other/Footer.jsx";
import Container90 from "../containers/Container90.jsx";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}
