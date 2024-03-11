import styles from "../../../styles/Dashboard/RecentInvoices.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import { getFullDateFromISO } from "../../../lib/dates";
import { formatNumber } from "../../../lib/validations/services";

const Invoice = () => {
  const { invoices } = useSelector(state => state.invoice)
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { theme } = useTheme();
  const { profile_business } = useSelector((state) => state.profileBusiness);
  const reversed_invoices = [...invoices].reverse();

  return (
    <>
      {invoices.length == 0 ?
        <p className={theme == "dark" ? "text-grey" : "black"}>{t("dashboard.no_invoices")}</p> :
        
        reversed_invoices.slice(0, 4).map(({ customer_name, invoice_value, status, created_at }, index) => (
          <div key={index} className={`w-100 p-2 px-3 mb-3 ${theme == 'dark' ? "dark-box" : ""} ${styles.Invoice}`} dir={language == "ar" ? "rtl" : "ltr"}>
            <div className="d-flex justify-content-between">
              <p>{customer_name}</p>
              <p className={`fw-bold ${theme == 'dark' ? "dark-blue" : ""}`}>{formatNumber(invoice_value)} {profile_business?.country?.short_currency}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p
                className={`${status == 'pending' && 'text-warning'}
                  ${status == 'paid' && 'text-success'}
                  ${status == 'unpaid' && 'text-danger'} text-uppercase`}
              >
                {status}
              </p>
              <p className={theme == 'dark' ? "text-grey" : "safqa-text-light-blue"}>{getFullDateFromISO(created_at)}</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default Invoice;
