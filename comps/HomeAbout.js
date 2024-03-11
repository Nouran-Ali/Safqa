import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import styles from "../styles/home/HomeAbout.module.css";
import { TitleCircle } from "./utils";

export const ReadMoreDetails = ({href}) => {

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return <div className={`fs-5 text-dark ${language == "en" ? "float-end" : "float-start"}`}>
    {t("button.readmore")}
    <span className={`${styles.btn_shadow} rounded-5 me-4 py-1`}>
      <Link href={href}>

        <button type="button" className={`${language == 'en' ? styles.btn : styles.btn_ar} mt-1 py-1 ms-3 rounded-5 safqa-white-color safqa-bgsecondary-gradient`}>
          {
            language == "en" ? <ArrowForwardSharpIcon /> : <ArrowBackIcon />
          }
        </button>

      </Link>
    </span>
  </div>
}


function HomeAbout() {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div dir={language == "ar" ? "rtl" : "ltr"} className={`${styles.about} `}>
      <div
        data-aos="zoom-in"
        data-aos-offset="100"
        className={`container ${styles.aboutContainer}`}
      >
        <h2 className="fw-bold position-relative">
          <span className={`safqa-darkgrey-color `}>{t("about.about")} </span>
          {t("about.safqa")}
          <TitleCircle className={`${language == "ar" && "safqa-right-75"} title_circle`} />
        </h2>
        <p className={`fs-5 mt-4 ${language == "en" ? "safqa-text-alignjustify" : "safqa-text-alignjustify-right"} ${styles.secondary_p}`}>
          {t("about.p1")}
          <br />
          <span className="mt-4">{t("about.p2")}</span>
        </p>
        <ReadMoreDetails href='/about' />
      </div>
    </div>
  );
}

export default HomeAbout;