import styles from "../../../../styles/Dashboard/Show.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const PaymentInformationDetails = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5"}  ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar"  ? "rtl" : "ltr"}>
        <h5>{t("dashboard.payment_information_details")}</h5>
        <hr />
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.paid_date")}</p>
            <p className={styles.data}>20/08/2022</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.vendor_service_charge")}</p>
            <p className={styles.data}>1.165 AED</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.due_deposit")}</p>
            <p className={styles.data}>4.777 AED</p>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.customer_service_charge")}</p>
            <p className={styles.data}>0.000 AED</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.VAT_amount")}</p>
            <p className={styles.data}>0.058AED</p>
          </div>
          <div className="col">
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentInformationDetails;