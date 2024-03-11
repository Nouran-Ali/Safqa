import styles from "../../../styles/Dashboard/Create.module.css";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const InvoiceType = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter();
  const { pathname } = router;
  // const idx = pathname.lastIndexOf("/");
  // const path = pathname.substring(idx+1);
  // const [radioType, setRadioType] = useState(pathname)
  const invoiceTypes = [
    {
      label: "Invoice",
      label_AR: "فاتورة",
      value: "/dashboard/invoices/create",
    },
    {
      label: "Quick Invoice",
      label_AR: "فاتورة سريعة",
      value: "/dashboard/invoices/quick/create",
    },
    {
      label: "Payment Link",
      label_AR: "رابط الدفع",
      value: "/dashboard/invoices/payments/create",
    },
  ];


  const handleChangeType = (e) => {
    router.push(`${e.target.value}`)
  }
  
  

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar"  ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.invoice_type")}</p>
        <hr />
        <div className="d-flex px-4 mt-4">
          {invoiceTypes.map((type) => {
            return (
              <div
                key={type.label}
                className={`form-check form-check-inline ${language == "en" ? "me-5" : "ms-5"}`}
              >
                <input
                  className={`form-check-input shadow-none ${styles.CheckInput}`}
                  type="radio"
                  name="invoice-type"
                  id={type.label}
                  value={type.value}
                  checked={ pathname === type.value  && true}
                  onChange={handleChangeType}
                />
                <label className="form-check-label" htmlFor={type.label}>
                  {i18n.language == 'ar' ? type.label_AR : type.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvoiceType;
