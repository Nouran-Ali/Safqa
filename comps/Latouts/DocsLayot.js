import HomeNavbar from "../HomeNavbar";
import Footer from "../Footer";
import { setCookie } from 'cookies-next';
import { BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { DocsSideNav, DocsSideNavNew, LinkHierarchyNew, MainTitle, NavLinks, SideNav } from "../docs/v1/DocsV1Components";
import styles from "../../styles/docs/v1.module.css"
import { useTranslation } from "react-i18next";

export default function DocsLayout({ children }) {

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const setLanguage = (lang) => {
    if (lang === "en") {
      setCookie("language", "en");
      window.location.reload();
    } else if (lang === "ar") {
      setCookie("language", "ar");
      window.location.reload();
    }
  };
  return (
    <>
      <HomeNavbar setLanguage={setLanguage} />
      <div className={`container-xl mt-5 ${language == "en"? "docsEN":"docsAR"}`} dir={language == "en" ? "ltr" : "rtl"}>
        <div className="row">
          <div className="col-md-3">
            {/* <DocsSideNavNew /> */}
            <div className={language == 'en' ? styles.sideNav : styles.sideNavAR}>
              <SideNav />
            </div>
            <div className={styles.navLinks}>
              <NavLinks />
            </div>
            {/* <DocsSideNav/> */}
          </div>
          <main className="col-md-9 ps-3">
            {children}
          </main>
        </div>
      </div>

      {/* <BackTop>
        <div className="d-flex justify-content-center safqa-main-bg text-white rounded p-3 text-center">
          <ArrowUpOutlined />
        </div>
      </BackTop> */}
      <Footer />
    </>
  );
}
