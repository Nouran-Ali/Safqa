import Link from "next/link";
import styles from "../styles/Dashboard/NavbarDashboard.module.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { setCookie, getCookie } from "cookies-next";
import SideNavbar from "./Dashboard/SideNavbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, logoutThunk } from "../store/slices/authSlice";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import ProfileDropDown from "./ProfileDropDown";
import { AiOutlineUnorderedList } from "react-icons/ai";
import NotificationsDropDown from "./NotificationsDropDown";
import SideDrawer from "./Dashboard/sideDrawer";

export default function DashboardNavbar() {
  const { theme, setTheme } = useTheme();

  const { myData } = useSelector((state) => state.auth);
  // const [isActive, setIsActive] = useState();
  // const nav_active = getCookie("nav_active");
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [t, i18n] = useTranslation();
  const { language, changeLanguage } = i18n;

  const toggleLanguage = () => {
    if (language == "en") {
      setCookie("language", "ar");
      changeLanguage("ar");
    } else {
      setCookie("language", "en");
      changeLanguage("en");
    }
  };

  const toggleTheme = () => {
    console.log("toggleTheme");
    console.log(theme);
    if (theme == "light") {
      setTheme("dark");
      setCookie("theme", "dark");
    } else {
      setTheme("light");
      setCookie("theme", "light");
    }
  };

  return (
    <nav
      className={`${styles.navbarDashboard} ${
        theme == "dark" ? "bg-dark" : "bg-white"
      } navbar navbar-expand-lg position-fixed w-100  z-index-10`}
    >
      <SideDrawer visible={drawerOpen} setVisible={setDrawerOpen} />
      <div className="container-xxl">
        <div className={`collapse navbar-collapse ${styles.navbar_collapse}`}>
          <div className="row w-100">
            <div className={`col-xl-3 col-lg-3 col-md-12 col-sm-12`}></div>
            <div
              className={`col-xl-6 col-lg-6 col-md-6 `}
              dir={language == "ar" ? "rtl" : "ltr"}
            >
              <ul
                className={`navbar-nav mb-2 py-1 d-flex align-items-center flex-row justify-content-between mb-lg-0 ${styles.dn} p-0`}
              >
                <li
                  onClick={() => setDrawerOpen(true)}
                  className={`nav-item mx-1 mt-3 d-lg-none  ${styles.navItem} ${styles.searchnav}`}
                >
                  <AiOutlineUnorderedList size={30} />
                </li>
                <li
                  className={`nav-item w-100 align-self-start text-center mt-3 ${styles.navItem} ${styles.searchnav}`}
                >
                  <input
                    className={` form-control shadow-none border-0 w-100 ${
                      theme == "dark" ? "dark-input" : "grey-input"
                    } ${styles.inpsearch}`}
                    placeholder={t("dashboard.search")}
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </li>
              </ul>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-6 ">
              <ul
                className={`mt-0 d-flex justify-content-between ${
                  language == "ar" && "float-start"
                } navbar-nav mb-2 mb-lg-0 flex-row align-items-center`}
              >
                <li
                  className={`
                  nav-item 
                  ${language == "en" ? "me-3" : "ms-4"}
                  ${styles.navItem} 
                  ${styles.notificationdropdown} 
                  ${language == "ar" && styles.notificationdropdownAR}`}
                >
                  <NotificationsDropDown />
                </li>

                <li className={`nav-item ${styles.navItem}`}>
                  <a
                    className={`nav-link border ${
                      theme == "dark" ? "text-white" : "safqa-text-primary"
                    } safqa-link-size btn rounded-3 ${
                      language == "en" ? "me-3" : "ms-4"
                    } ${styles.nav_item} nav-item`}
                    style={{
                      maxWidth: "50px",
                      maxHeight: "50px",
                      minWidth: "30px",
                      minHeight: "30px",
                    }}
                    onClick={toggleLanguage}
                  >
                    {language === "en" ? "AR" : "EN"}
                  </a>
                </li>

                <li className={`nav-item ${styles.navItem}`}>
                  <button
                    className={`nav-link d-flex btn rounded-3 border-0 px-4 ${
                      language == "en" ? "me-2" : "ms-3"
                    } safqa-white-color 
                  safqa-bg-primary-dashboard-gradient

                     border-0 ${styles.darkMode}`}
                    onClick={toggleTheme}
                  >
                    <span>
                      {theme == "light" ? <DarkModeIcon /> : <LightModeIcon />}
                    </span>
                    <span className={language == "en" ? "ms-1" : "me-1"}>
                      {theme == "light"
                        ? t("dashboard.dark")
                        : t("dashboard.light")}
                    </span>
                  </button>
                </li>
                <li
                  className={`nav-item  ${styles.navItem} ${styles.logoCompany}`}
                >
                  <ProfileDropDown />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
