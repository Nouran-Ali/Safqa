import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GetItInAS, GetItInGP } from "./Buttons";
import { getCookie } from 'cookies-next';
import styles from "../styles/home/Main.module.css";

const Main = () => {

  const [imgMain, setImgMain] = useState("");
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const lang = getCookie('language');

  useEffect(() => {
    if (!lang || lang === 'en') {
      i18n.changeLanguage('en')
    } else if (lang === "ar") {
      i18n.changeLanguage('ar')
    }
  }, [i18n, lang])

  useEffect(() => {
    setTimeout(() => {
      setImgMain(styles.img_main);
    }, 200);
  }, []);

  return (
    <div className="container" dir={language == "ar" ? "rtl" : "ltr"}>
      {/* stars */}
      <Stars />

      <div className={`row mt-4 ${styles.main}`}>
        <div
          data-aos="slide-right"
          data-aos-offset="100"
          className="col-xl-6 col-lg-6 col-md-12 col-sm-12"
        >
          <h1  className="fw-bold mt-5 safqa-text-gradient">{t("home.main.h1")}</h1>

          <p className="fs-5 mt-4 color-secondary">{t("home.main.p")}</p>
          <div className="btns-main mt-5 d-flex">
            <GetItInGP className="btnApp pointer px-4" label={t("button.getapp")} href="#"/>
            <GetItInAS
              className="btnApp pointer px-4 mx-3"
              label={t("button.getapp")}
              href="#"
            />
          </div>
          <DotsRectangle />
        </div>

        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
          <img
            className={`${styles.bg_image_main} position-absolute ${language == "ar" ? "img-flip" : ""}`}
            src="/home/main/2.png"
            alt="bg"
            width="49%"
            height="515px"
          />
          <img
            className={`${imgMain ? imgMain : null} w3-animate-bottom`}
            src="/home/main/1.png"
            alt="security"
            width="100%"
            height="513px"
          />
        </div>
      </div>
    </div>
  );
};

const DotsRow = () => {
  return (
    <div className="lh-lg">
      &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679;
      &#9679; &#9679;
    </div>
  );
};

const DotsRectangle = ({ cols, rows }) => {
  return (
    <div className={`${styles.dots} safqa-grey3-color position-absolute`}>
      <DotsRow />
      <DotsRow />
      <DotsRow />
      <DotsRow />
      <DotsRow />
      <DotsRow />
    </div>
  );
};

const Stars = () => {
  const SevenStars = () => {
    const STARS_COUNT = [1, 2, 3, 4, 5, 6, 7];

    return STARS_COUNT.map((star_number) => (
      <span key={star_number} className={`${styles[`star_${star_number}`]}`}>
        &#9932;
      </span>
    ));
  };

  return (
    <div className={styles.home_stars}>
      <SevenStars />
    </div>
  );
};

export default Main;
