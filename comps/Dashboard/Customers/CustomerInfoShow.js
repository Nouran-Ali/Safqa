import styles from "../../../styles/Dashboard/Show.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const CustomerInfoShow = ({ customer }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar"  ? "rtl" : "ltr"}>
        <h5>{t("dashboard.customer_info")}</h5>
        <hr />
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.customer_name")}</p>
            <p className={styles.data}>{customer.full_name}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.phone_number")}</p>
            <p className={styles.data}>{customer.country.code + customer.phone_number}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.customer_email")}</p>
            <p className={styles.data}>{customer.email}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.customer_reference")}</p>
            <p className={styles.data}>{customer.customer_reference}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoShow;
