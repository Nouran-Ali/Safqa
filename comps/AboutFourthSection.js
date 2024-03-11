import { useTranslation } from "react-i18next";
import styles from "../styles/about/About.module.css";

function AboutFourthSection() {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <div
            data-aos="zoom-in" data-aos-offset="100"
            className={`${styles.thirdSection} fs-5 w-75 ${language == "ar" ? "ms-auto" : "me-auto"}`}
            dir={language == "ar" ? "rtl" : "ltr"}
        >
            <h4 className="fw-bold ">{t("AboutFourthSection.title")}</h4>
            <p className={`mt-3 ${language == "en" ? "safqa-text-alignjustify" : "safqa-text-alignjustify-right"}`}>
                {t("AboutFourthSection.p")}
            </p>
            <ol>
                <li>{t("AboutFourthSection.items.security")}</li>
                <li>{t("AboutFourthSection.items.innovation")}</li>
                <li>{t("AboutFourthSection.items.convenience")}</li>
            </ol>
        </div>
    )
}

export default AboutFourthSection