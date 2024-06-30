import Navbar from "../../components/other/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../other/Footer.jsx";
import { Box } from "@mui/material";
import ScrollToTop from "../other/ScrollToTop.jsx";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Box minHeight={"80vh"}>
        <Outlet />
      </Box>
      <ScrollToTop />
      <Footer />
    </>
  );
}
