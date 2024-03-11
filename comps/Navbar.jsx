import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { arch } from "os";
import { useTranslation } from "react-i18next";
import { i18n } from "../comps/i18n";
import { setCookie } from "cookies-next";
import HomeNavbar from "./HomeNavbar";
import SideNavbar from "./Dashboard/SideNavbar";
import DashboardNavbar from "./DashboardNavbar";

const Navbar = () => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const router = useRouter();
  const { pathname } = router;

  

  if (pathname.includes("dashboard")) {
    // return dashboard navbar
    return (
      <>
        <SideNavbar />
        <DashboardNavbar/>
      </>
    );
  } else {
    // return home navbar
    return (
      <>
        <HomeNavbar />
      </>
    );
  }
};

export default Navbar;
