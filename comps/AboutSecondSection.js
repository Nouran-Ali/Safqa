import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "../styles/about/About.module.css";

function AboutSecondSection() {

    const [t, i18n] = useTranslation();
    const { language } = i18n;

    return (
        <div className={`row ${styles.secondSection}`}>
            <div data-aos="slide-right" data-aos-offset="100" className="col-xl-4 col-lg-4 ">
                <img
                    src="/about/Payment Information-rafiki.png"
                    width="400px"
                    className={styles.weDoImage}
                />
            </div>
            <div
                className="col-xl-8 col-lg-8 fs-5 px-5"
                dir={language == "ar" ? "rtl" : "ltr"}
                data-aos="slide-left"
                data-aos-offset="100"
            >
                <p className="fw-bold text-center">{t("AboutSecondSection.title")}</p>
                <p>
                    {t("AboutSecondSection.p")}
                </p>
                <div style={{ color: "#315d7d" }}>
                    <p>
                        <CheckCircleIcon className="me-2" /> {t("AboutSecondSection.paymentprocessing")}
                    </p>
                    <p>
                        <CheckCircleIcon className="me-2" /> {t("AboutSecondSection.merchantservices")}
                    </p>
                    <p>
                        <CheckCircleIcon className="me-2" /> {t("AboutSecondSection.ecommerce")}
                    </p>
                    <p>
                        <CheckCircleIcon className="me-2" /> {t("AboutSecondSection.mastercardservices")}
                    </p>
                    <p>
                        <CheckCircleIcon className="me-2" /> {t("AboutSecondSection.visacardservices")}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutSecondSection