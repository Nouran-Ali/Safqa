import styles from "../../styles/Dashboard/Show.module.css";
import InvoiceDetailsTableTaxInvoice from "./InvoiceDetailsTableTaxInvoice";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const CompanyInformationandDetailsTaxInvoices = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`${language == "en" ? "mt-5" : "mt-3"} mb-4`} dir={language == "ar"  ? "rtl" : "ltr"}>
      <div className={`rounded-2 me-4 ${theme == 'dark' ? styles.info_dark : styles.info}`}>
        <h5>{t("dashboard.company_information")}</h5>
        <hr />
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p className="text-dark">{t("dashboard.company")}</p>
            <p className={styles.data}>SAFQA fee collection services</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p className="text-dark">{t("dashboard.tax_number")}</p>
            <p className={styles.data}>100763482200003</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p className="text-dark">{t("dashboard.merchant")}</p>
            <p className={styles.data}>Tm L.L.C</p>
          </div>
        </div>

        <h5>{t("dashboard.invoice_details")}</h5>
        <hr />
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p className="text-dark">{t("dashboard.time_period")}</p>
            <p className={styles.data}>01/08/2022 To 31/08/2022</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p className="text-dark">{t("dashboard.address")}</p>
            <p className={styles.data}>Lorem Apsum</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p className="text-dark">{t("dashboard.commercial_registration_no")}</p>
            <p className={styles.data}>Lorem Apsum</p>
          </div>
        </div>

        <InvoiceDetailsTableTaxInvoice/>

      </div>
    </div>
  );
};

export default CompanyInformationandDetailsTaxInvoices;