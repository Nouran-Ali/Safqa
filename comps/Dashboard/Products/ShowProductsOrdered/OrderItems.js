import styles from "../../../../styles/Dashboard/Show.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const OrderItems = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5"}  ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar"  ? "rtl" : "ltr"}>
        <h5>{t("dashboard.order_items")}</h5>
        <hr />
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.product_name")}</p>
            <p className={styles.data}>T-shirt</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.unit_price")}</p>
            <p className={styles.data}>40 AED</p>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6">
            <p>{t("dashboard.quantitiy")}</p>
            <p className={styles.data}>1</p>
          </div>
          <div className={`col-xl-1 col-lg-1 col-md-6 col-sm-6 ${styles.ColorBlue}`}>
            <p>{t("dashboard.total")}</p>
            <p>40</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItems;