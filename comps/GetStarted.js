import { useTranslation } from "react-i18next";
import styles from "../styles/home/GetStarted.module.css";
import Link from "next/link";

function GetStarted() {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`container ${styles.getStarted}`}>
      <div className="row">
        <div
          data-aos="slide-right"
          data-aos-offset="100"
          className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-5"
        >
          <img
            className={`${styles.img_getStarted} position-absolute`}
            src="home/getStarted/getStarted.png"
            alt="security"
            height="413px"
          />
        </div>
        <div
          data-aos="slide-left"
          data-aos-offset="100"
          className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-5"
          dir={language=="ar" ? "rtl" : "ltr"}
        >
          <div className={`${styles.margin_top} ms-5`}>
            <h2 className="fw-bold text-body">{t("getstarted.title")}!</h2>
            <Link href="/join" className="safqa-main-bg safqa-white-color btn mt-5 p-2 px-5">
              <span>{t("button.getstart")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
