import styles from "../../../styles/Dashboard/Show.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Contact = ({ contacts }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const {
    country,
    city,
    area,
    block,
    avenue,
    street,
    support_email,
    sales_support_officer_info,
  } = contacts;

  const { abouts } = useSelector((state) => state.about);

  return (
    <div
      className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`}
      dir={language == "ar" ? "rtl" : "ltr"}
    >
      <div
        className={`rounded-2 me-4 ${
          theme == "dark" ? styles.info_dark : styles.info
        }`}
      >
        <h5>{t("dashboard.contact")}</h5>
        <hr />
        <div className="safqa-responsive-width-50">
          <div>
            <p>{t("dashboard.address")}</p>
            <p className={styles.data}>
              {country}, {city}, {area}, {avenue} {street}, {block}.
            </p>
          </div>
          <div>
            <p>{t("dashboard.email")}</p>
            <p className={styles.data}>{support_email}</p>
          </div>
          <div>
            <p>{t("dashboard.sales_contact_details")}</p>
            <p className={styles.data}>+971 54 586 0633 (Support)</p>
            <p className={styles.data}>+971 54 586 0633 (Support)</p>
          </div>
        </div>
      </div>

      <div
        className={`rounded-2 me-4 ${
          theme == "dark" ? styles.info_dark : styles.info
        }`}
      >
        <h5>{t("dashboard.about")}</h5>
        <hr />
        <div className="safqa-responsive-width-50">
          <div>
            {abouts?.length > 0 &&
              abouts.map((about) => (
                <p className={styles.data} key={about.id}>
                  {about.about}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
