import Link from "next/link";
import { useState, useEffect } from "react";
import hideStyles from "../../styles/Dashboard/MenuLinks.module.css";
import showStyles from "../../styles/Dashboard/DrawerMenuLinks.module.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, ResetArrowActive } from "../../store/slices/authSlice";
import SideMenuLinks from "./SideMenuLinks";
import { getCookie, setCookie } from "cookies-next";
import { toggleNavActive } from "../../store/slices/sidenav";
import { Language } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import WalletPreview from "./Home/WalletPreview";

const LoadingComp = () => {
  return (
    <div className={styles.container}>
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="spinner-border safqa-text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

const SideNavbar = ({ show = false, onClick = () => {} }) => {
  const dispatch = useDispatch();
  const nav_active = useSelector((state) => state.sideNav.isActive);
  const { isLoading, error, myData } = useSelector((state) => state.auth);
  const styles = show ? showStyles : hideStyles;
  // const {arrowActive} = useSelector((state) => state.auth)
  const [isActive, setIsActive] = useState();
  const [arrowActive, setArrowActive] = useState(getCookie("arrowActive"));
  const { theme } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setArrowActive(false);
      dispatch(ResetArrowActive());
    }, 3700);
  }, [dispatch]);

  useEffect(() => {
    setIsActive(nav_active);
  }, [nav_active]);

  const handleClick = () => {
    dispatch(toggleNavActive());
  };

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`d-flex justify-content-between  ${styles.MenuLinks} dark`}>
      <div
        className={`offcanvas overflow-auto show z-index-100
        ${language == "en" ? " offcanvas-start" : " offcanvas-end"} 
         ${isActive ? styles.openMenu : styles.closeMenu} 
         ${theme == "dark" ? styles.offcanvas_dark : ""}`}
        style={{ top: show ? 50 : 0 }}
        onClick={() => {
          onClick();
        }}
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header d-flex flex-column justify-content-center">
          <Link
            href="/dashboard"
            className={`navbar-brand mx-auto ${styles.navbarBrandDashboard} ${
              !isActive && styles.dn
            }`}
          >
            <img
              src={theme == "dark" ? "/dark-logo.png" : "/logo.png"}
              alt="logo"
              className="mx-auto"
              width={theme == "dark" ? "105px" : "60px"}
            />
          </Link>
          {/* <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> */}
          <p
            className={`text-center m-0 mt-2 fw-bold p-0 fs-5  safqa-text-secondary2-dashboard
              ${theme == "dark" ? "text-white" : ""} 
              ${styles.navItem} 
              ${styles.dn}`}
          >
            {t("dashboard.Hello")}, {myData?.full_name || myData?.name}
          </p>
          <WalletPreview />
        </div>

        <hr className="border border-1 mt-0" />

        <div className={`offcanvas-body p-0 ${styles.offcanvasBody}`}>
          {/* here is the menuLinks */}
          {/* {isLoading ? 
          <LoadingComp/>:  */}
          <SideMenuLinks isActive={isActive} show={show} />
          {/* } */}

          <br />
          <br />
        </div>
        <a
          className={`position-absolute bg-white top-50 translate-middle-x border border-1 rounded-circle p-2 ${styles.arrow}`}
          onClick={handleClick}
        >
          {/* <ArrowForwardIosIcon /> */}
          <KeyboardDoubleArrowLeftIcon />
        </a>

        {arrowActive && (
          <div
            className={`position-absolute translate-middle-x p-2 ${styles.arrow_animation}`}
          >
            <lottie-player
              src="https://lottie.host/f4be227d-7374-4f11-832a-ab13b61d18a0/QlqrLu81Lt.json"
              background="transparent"
              speed="1"
              style={{ width: "100px", height: "100px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
