import { useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { getGlobalData } from "../store/slices/global";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import DashboardLayout from "./Latouts/DashboardLayout.jsx";
import HomeLayout from "./Latouts/HomeLayot";
import { getMyData } from "../store/slices/authSlice.js";
import { ThemeProvider } from "next-themes";
import DocsLayout from "./Latouts/DocsLayot.js";


const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname } = router;
  const nav_active = getCookie("nav_active");
  const token = getCookie("token");


  useEffect(() => {
    dispatch(getGlobalData());
  }, [dispatch, token]);

  return (
    <>
      {pathname.includes("/dashboard") ? (
        <ThemeProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </ThemeProvider>
      ) : pathname.includes("/docs") ? (
          <DocsLayout>{children}</DocsLayout>  
      ):(
        <HomeLayout>{children}</HomeLayout>
      )}
    </>
  );
};

export default Layout;
