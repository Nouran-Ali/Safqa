import Link from "next/link";
import styles from "../../../styles/Dashboard/ButtonsDashboard.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";



const ButtonsDashboard = () => {
  const { theme } = useTheme()
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const buttonList = [
    {
      name: t("dashboard.home.create_invoice"),
      href: "/dashboard/invoices/create",
    },
    {
      name: t("dashboard.home.create_quick_invoice"),
      href: "/dashboard/invoices/quick/create",
    },
    {
      name: t("dashboard.home.payment_link"),
      href: "/dashboard/invoices/payments/create",
    }
  ]

  return (
    <div
      className={`d-flex justify-content-between mb-4 ${styles.mainbuttons}`}
      dir={language == "ar" ? "rtl" : "ltr"}
    >
      {
        buttonList.map(({ href, name }) =>
          <Link
            key={href}
            href={href}
            className={`btn ${theme == 'dark' ? "dark-blue-box text-white border-0 shadow-none" : "text-dark border-1"} rounded-2  `}>
            {name}
          </Link>
        )
      }
    </div>
  );
};

export default ButtonsDashboard;
