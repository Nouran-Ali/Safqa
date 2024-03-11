import { useTranslation } from "react-i18next";
import styles from "../styles/about/About.module.css";

function AboutThirdSection() {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <div
            data-aos="zoom-in" data-aos-offset="100"
            className={`${styles.thirdSection}  fs-5 w-75 ${language == "ar" ? "ms-auto" : "me-auto"}`}
            dir={language == "ar" ? "rtl" : "ltr"}
        >
            <h4 className="fw-bold ">{t("AboutThirdSection.title")}</h4>
            <p className={`mt-3 ${language =="en"? "safqa-text-alignjustify":"safqa-text-alignjustify-right"}`}>
                {t("AboutThirdSection.p")}
            </p>
        </div>
    )
}

export default AboutThirdSection