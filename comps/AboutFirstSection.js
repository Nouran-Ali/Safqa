import { useTranslation } from "react-i18next";
import styles from "../styles/about/About.module.css";

function AboutFirstSection() {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`row`}>

      <div
        data-aos="slide-right"
        data-aos-offset="100"
        className="col-xl-6 col-lg-6"
        dir={language == "ar" ? "rtl" : "ltr"}
      >
        <h2 className="fw-bold mb-4">
          <span className="safqa-darkgrey-color">{t("AboutFirstSection.about")} </span>
          {t("safqa")}
        </h2>
        <p className={`fs-5 ${language == "en" ? "safqa-text-alignjustify" : "safqa-text-alignjustify-right"}`}
        >
          {t("AboutFirstSection.p")}
        </p>
        <img
          src="/about/dotsAbout2.png"
          width="200px"
          className="dotsAbout float-end"
        />
      </div>
      <div
        data-aos="slide-left"
        data-aos-offset="100"
        className={`col-xl-6 col-lg-6 ${styles.aboutPageImage}`}
      >
        <lottie-player
          src="https://assets8.lottiefiles.com/packages/lf20_i2w8eqnu.json"
          background="transparent"
          speed="1"
          style={{ height: "450px", marginTop: "-50px", marginLeft: "auto", marginRight: "auto" }}
          loop
          autoplay
          data-aos="slide-left" data-aos-offset="100"
        >
        </lottie-player>
      </div>
    </div>
  );
}

export default AboutFirstSection;
