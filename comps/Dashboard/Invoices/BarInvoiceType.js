import styles from "../../../styles/Dashboard/BusinessType.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

const BarInvoiceType = ({ setInvoices }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const [selectedType, setSelectedType] = useState("invoices");
  const {
    statistics: {
      normal_invoices,
      product_invoice,
      payment_invoices,
      transaction_count,
      transaction_value,
    },
  } = useSelector((state) => state.auth);

  const router = useRouter();
  const { pathname } = router;
  // const idx = pathname.lastIndexOf("/");
  // const path = pathname.substring(idx+1);
  // const [radioType, setRadioType] = useState(pathname)
  const invoiceTypes = [
    {
      label: "Invoices",
      label_AR: "فواتير",
      type: "invoices",
    },
    {
      label: "Payment Invoices",
      label_AR: "فواتير الدفع",
      type: "payment_invoices",
    },
    {
      label: "Product Invoices",
      label_AR: "فواتير المنتج",
      type: "product_invoices",
    },
  ];

  const handleChangeType = (e) => {
    setSelectedType(e.target.value);
    if (e.target.value == "invoices") {
      setInvoices(normal_invoices);
    } else if (e.target.value == "payment_invoices") {
      setInvoices(payment_invoices);
    } else if (e.target.value == "product_invoices") {
      setInvoices(product_invoice);
    }
  };

  return (
    <div className={`mt-2 mb-4`}>
      <div
        className={`rounded-2 ${
          theme == "dark" ? styles.info_dark : styles.info
        }`}
        dir={language == "ar" ? "rtl" : "ltr"}
      >
        <p className="px-4 fs-5">{t("dashboard.statistics_type")}</p>
        <hr />
        <div className="d-flex px-4 mt-4 flex-wrap">
          {invoiceTypes.map((type) => {
            return (
              <div
                key={type.label}
                className={`form-check form-check-inline ${
                  language == "en" ? "me-5" : "ms-5"
                }`}
              >
                <input
                  className={`form-check-input shadow-none ${styles.CheckInput}`}
                  type="radio"
                  name="invoice-type"
                  id={type.label}
                  value={type.type}
                  checked={selectedType === type.type ? true : false}
                  onChange={handleChangeType}
                />
                <label className="form-check-label" htmlFor={type.label}>
                  {i18n.language == "ar" ? type.label_AR : type.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BarInvoiceType;
