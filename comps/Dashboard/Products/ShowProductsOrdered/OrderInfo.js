import Link from "next/link";
import styles from "../../../../styles/Dashboard/Show.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const OrderInfo = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5"}  ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar"  ? "rtl" : "ltr"}>
        <h5>{t("dashboard.order_info")}</h5>
        <hr />
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.order_ID")}</p>
            <p className={styles.data}>2453022 /2022000028</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.views")}</p>
            <p className={styles.data}>2</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.order_value")}</p>
            <p className={styles.data}>430 AED</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.date_created")}</p>
            <p className={styles.data}>30/10/2021 08:18 PM</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.expiry_date")}</p>
            <p className={styles.data}>01/08/2022 10:41 PM</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.order_status")}</p>
            <p className={styles.data}>Prepared</p>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.order_type")}</p>
            <p className={styles.data}>Pickup</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.invoice_url")}</p>
            <p className={styles.data}>
              <Link href="#" className="text-decoration-underline text-break">
                
                  https://portal.safqa.com/En/ARE/PayInvoice/Details/050718362254006061
                
              </Link>
            </p>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
