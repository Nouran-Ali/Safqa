import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
import Emails from "./Emails";
import styles from "../styles/home/Footer.module.css";

const Footer = () => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const router = useRouter();
  const { pathname } = router;

  if (pathname.includes("/dashboard")) {
    return <> </>;
  } else {
    return (
      <div className={`${styles.footer} mt-5`} dir={language == "ar" ? "rtl" : "ltr"}>
        <div className="container">
          <div className="row">
            <div
              className={`col-xl-3 col-lg-3 col-md-6 col-sm-6 ${styles.body_footer}`}
            >
              <span className="fw-bold fs-4 text-uppercase">
                {t("footer.title1")}
              </span>
              <br />
              <Link href="/about">
                {t("links.about")}
              </Link>
              <br />
              <Link href="/services">
                {t("links.services")}
              </Link>
              <br />
              <Link href="/contact">
                {t("links.contact")}
              </Link>
            </div>
            <div
              className={`col-xl-3 col-lg-3 col-md-6 col-sm-6 ${styles.body_footer}`}
            >
              <span className="fw-bold fs-4 text-uppercase">
                {t("footer.title2")}
              </span>
              <br />
              <a href="#">{t("links.document")}</a>
              <br />
              <a href="#">{t("links.app")}</a>
              <br />
            </div>
            <div
              className={`col-xl-3 col-lg-3 col-md-6 col-sm-6 ${styles.body_footer}`}
            >
              <span className="fw-bold fs-4 text-uppercase">
                {t("footer.title3")}
              </span>
              <br />
              <Link href="/TermsOfUse">
                {t("links.termsofuse")}
              </Link>
              <br />
              <Link href="/PrivacyPolicy">
                {t("links.privacypolicy")}
              </Link>
              <br />
            </div>
            <div
              className={`col-xl-3 col-lg-3 col-md-6 col-sm-6 ${styles.body_footer}`}
            >
              <span className="fw-bold fs-4 text-uppercase">
                {t("footer.title4")}
              </span>
              <br />
              <div className="d-flex">
                <a href="#">
                  <p
                    className={` ${styles.icons_footer} facebook-icon border rounded-circle me-3`}
                  >
                    <i className="fa fa-facebook-f p-1" aria-hidden></i>
                  </p>
                </a>
                <a href="#">
                  <p
                    className={`${styles.icons_footer} instagram-icon border rounded-circle me-3`}
                  >
                    <InstagramIcon sx={{ fontSize: 20 }} />
                  </p>
                </a>
                <a href="#">
                  <p
                    className={`${styles.icons_footer} twitter-icon border rounded-circle me-3`}
                  >
                    <TwitterIcon sx={{ fontSize: 20 }} />
                  </p>
                </a>
                {/* <a href="#">
                  <p
                    className={`${styles.icons_footer} whatsapp-icon border rounded-circle me-3`}
                  >
                    <WhatsAppIcon sx={{ fontSize: 20 }} />
                  </p>
                </a> */}
              </div>
              <Emails />
            </div>
          </div>
          <hr className="safqa-darkgreyborder-color" />
          <p className="text-center fs-5">{t("footer.p")}</p>
        </div>
      </div>
    );
  }
};

export default Footer;
