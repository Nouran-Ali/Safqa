import styles from "../../styles/Dashboard/Show.module.css";
import { useTranslation } from "react-i18next";

const InvoiceDetailsTableTaxInvoice = () => {

  const [t, i18n] = useTranslation();

  return (
    <div>
      <div className="table-responsive w-100">
        <table
          className={`table table-borderless mt-3 rounded-3 text-center ${styles.tableInvoice}`}
        >
          <thead className={`${styles.titleTable}`}>
            <tr>
              <th scope="col">{t("dashboard.invoice_no")}</th>
              <th scope="col">{t("dashboard.service")}</th>
              <th scope="col">{t("dashboard.invoice_id")}</th>
              <th scope="col">{t("dashboard.amount")}</th>
              <th scope="col">{t("dashboard.date")}</th>
              <th scope="col">{t("dashboard.vat_rate")}</th>
              <th scope="col">{t("dashboard.vat")}</th>
              <th scope="col">{t("dashboard.total")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-muted ">
              <td>20226601</td>
              <td>Service Fees</td>
              <td>2613912</td>
              <td>1.165</td>
              <td>20/08/2022</td>
              <td>5 %</td>
              <td>0.058</td>
              <td>1.223</td>
            </tr>
          </tbody>
        </table>
      </div>
      <table className="table mt-4">
        <tbody>
          <tr>
            <th>{t("dashboard.NUMBER_OF_INVOICES")}</th>
            <td className={styles.colorBlue}>1</td>
          </tr>
          <tr>
            <th>{t("dashboard.TOTAL_EXCLUDING_VAT")}</th>
            <td className={styles.colorBlue}>1.165</td>
          </tr>
          <tr>
            <th>{t("dashboard.TOTAL_VAT")}</th>
            <td className={styles.colorBlue}>0.058</td>
          </tr>
          <tr>
            <th>{t("dashboard.TOTAL_INCLUDING_VAT")} </th>
            <td className={styles.colorBlue}>1.223</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceDetailsTableTaxInvoice;
