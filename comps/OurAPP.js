import { useTranslation } from "react-i18next";
import { GetItInGP, GetItInAS } from "./Buttons";
import { TitleCircle } from "./utils";
import styles from "../styles/home/OurAPP.module.css";

function OurAPP({ margin }) {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
    const our_app_phrases = t('our_app.phrases', {
      returnObjects: true,
    });


  return (
    <div className={` container ${margin && styles.ourApp} `}>
      <div className="row">
        <div
          data-aos="slide-right"
          data-aos-offset="100"
          className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-5 mt-5"
          dir={language == "ar" ? "rtl" : "ltr"}
        >
          <h2 className="position-relative text-dark fw-bold text-uppercase">
            {language == "en" ? (
              <>
                <span className="safqa-darkgrey-color">{t("ourapp.our")} </span>
                {t("ourapp.title")}
              </>
            ) : (
              <span className="safqa-darkgrey2-color">
                {t("ourapp.title")}{" "}
              </span>
            )}

            <TitleCircle
              className={`${language == "ar" && "safqa-right-50"} app-circle`}
            />
          </h2>
          <p className="fs-5">{t("ourapp.p")}</p>
          <div className="btns-ourapp mt-5 d-flex flex-wrap g-10">
            <GetItInGP
            
              className="btnApp btnBlack pointer px-5"
              label={t("button.getapp")}
            />
            <GetItInAS
              className="btnApp btnBlack pointer px-5 mx-3"
              label={t("button.getapp")}
            />
          </div>
        </div>
        <div
          data-aos="slide-left"
          data-aos-offset="100"
          className={`col-xl-6 col-lg-6 col-md-12 col-sm-12 ${styles.img_app}`}
        >
          <picture>
            <img
              className={` mx-auto d-flex justify-content-center align-items-center`}
              src="/home/app/app.png"
              alt="app"
              height="409.4px"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}

export default OurAPP;
