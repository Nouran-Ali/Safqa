import { useTranslation } from "react-i18next";
import styles from "../styles/about/About.module.css";

function AboutFifthSection() {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <div
            data-aos="zoom-in" data-aos-offset="100"
            className={`${styles.thirdSection}  fs-5 w-75 ${language == "ar" ? "ms-auto" : "me-auto"}`}
            dir={language == "ar" ? "rtl" : "ltr"}
        >
            <h4 className="fw-bold ">{t("AboutFifthSection.title")}</h4>
            <p className={`mt-3 ${language == "en" ? "safqa-text-alignjustify" : "safqa-text-alignjustify-right"}`}>
                {t("AboutFifthSection.p")}
            </p>
            <ol>
                <li>{t("AboutFifthSection.items.transparency")}</li>
                <li>{t("AboutFifthSection.items.speed_and_efficiency")}</li>
                <li>{t("AboutFifthSection.items.security")}</li>
                <li>{t("AboutFifthSection.items.privacy")}</li>
                <li>{t("AboutFifthSection.items.accessible")}</li>
                <li>{t("AboutFifthSection.items.reliability")}</li>
            </ol>
        </div>
    )
}

export default AboutFifthSection