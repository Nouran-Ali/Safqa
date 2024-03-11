import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { arch } from "os";
import { useTranslation } from "react-i18next";
import { i18n } from "../comps/i18n";
import { setCookie } from "cookies-next";
import { BtnJoin } from "./Buttons";
import styles from "../styles/HomeNavbar.module.css";
import Image from "next/image";

export default function  HomeNavbar() {
  const [expand, setExpand] = useState(false);
  const [t, i18n] = useTranslation();
  const { language, changeLanguage } = i18n;
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    setExpand(false);
    console.log(
      "🚀 ~ file: HomeNavbar.js:23 ~ HomeNavbar ~ pathname",
      pathname
    );
  }, [pathname]);

  const navItemList = [
    {
      name: "home",
      href: "/",
    },
    {
      name: "about",
      href: "/about",
    },
    {
      name: "services",
      href: "/services",
    },
    {
      name: "contact",
      href: "/contact",
    },
    {
      name: "document",
      href: "/docs/v1",
    },
    {
      name: "app",
      href: "/ourApp",
    },
  ];

  const NavUlItems = ({ items }) => {
    const toggleLanguage = () => {
      if (language == "en") {
        setCookie("language", "ar");
        changeLanguage("ar");
      } else {
        setCookie("language", "en");
        changeLanguage("en");
      }
    };

    return (
      <ul
        className={` navbar-nav position-relative  ${
          language == "en" ? "ms-auto" : "me-auto"
        } mb-2 mb-lg-0`}
      >
        {items.map(({ href, name }) => (
          <li
            key={href}
            className={`${styles.nav_item} ${
              pathname === href ||
              (pathname !== "/" &&
                pathname === href &&
                pathname.includes(href)) ||
              (pathname.includes("docs") && href.includes("docs"))
                ? `${styles.active} active`
                : ""
            } nav-item `}
          >
            <Link
              href={`${href}`}
              className="nav-link safqa-link-size"
              aria-current="page"
            >
              {t(`links.${name}`)}
            </Link>
            {/* {
              pathname === href &&
              <hr className={language == "en" ? styles.hrActive : styles.hrActiveAR} />
            } */}
          </li>
        ))}

        <li className={styles.nav_item + " nav-item"}>
          <a
            className={`nav-link safqa-text-primary safqa-grayborder-color safqa-link-size btn mt-1 rounded-3 me-3 ${styles.nav_item} nav-item  ${styles.btn_arabic}`}
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

        <li className={styles.nav_item + " nav-item"}>
          <BtnJoin
            className="btnApp btnJoin pointer px-5 "
            label={t("links.join")}
            href="#"
          />
        </li>

        <li className={styles.nav_item + " nav-item"}>
          <Link
            href="/login"
            className={`btn rounded-3 safqa-blueborder-color ${
              language === "en" ? styles.btn_login : "w-100"
            }`}
          >
            {t("links.login")}
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <nav
      dir={language === "ar" ? "rtl" : "ltr"}
      className={`navbar navbar-expand-lg bg-transparent w3-animate-top`}
    >
      <div className={` container safqa-borderbottom-color`}>
        <Link href="/" className={` ${styles.logo} navbar-brand`}>
          {/* <Image layout="fill" src="/Final-Logo.png" alt="logo" /> */}
          <img src="/Final-Logo.png" alt="logo" />
        </Link>
        <button
          className="navbar-toggler shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setExpand(!expand)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${expand && "show"}`}
          id="navbarSupportedContent"
        >
          <NavUlItems items={navItemList} />
        </div>
      </div>
    </nav>
  );
}
