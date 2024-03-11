import styles from "../../../styles/Dashboard/Show.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const CustomerInfoShow = ({ invoice }) => {
  console.log("🚀 ~ file: CustomerInfoShow.js:6 ~ CustomerInfoShow ~ invoice", invoice)
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const {
    customer_name,
    customer_mobile,
    customer_email,
    mobile_code,
    customer_reference,
    send_invoice_option,
    sent_sms_counter
  } = invoice

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <h5>{t("dashboard.customer_info")}</h5>
        <hr />
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.customer_name")}</p>
            <p className={styles.data}>{customer_name}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.customer_email")}</p>
            <p className={styles.data}>{customer_email}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.customer_reference")}</p>
            <p className={styles.data}>{customer_reference}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.send_invoice_by")}</p>
            <p className={`${styles.data} text-uppercase`}>{send_invoice_option?.[language == 'en' ? 'name_en' : 'name_ar']}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.customer_phone_number")}</p>
            <p className={styles.data}>{mobile_code?.code}{customer_mobile}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.sent_sms_counter")}</p>
            <p className={styles.data}>{sent_sms_counter}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoShow;
