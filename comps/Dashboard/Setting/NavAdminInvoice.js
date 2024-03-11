import { useRouter } from "next/router";
import styles from "../../../styles/Dashboard/Navs.module.css";
import Link from "next/link"
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const NavAdminInvoice = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { pathname } = router;

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const invoicesLinks = [
    {
      label: "Recurring Interval",
      label_AR: "الفاصل الزمني المتكرر",
      href: "/dashboard/admin/invoice/recurringInterval",
    },
    {
      label: "Expiry Types",
      label_AR: "أنواع انتهاء الصلاحية",
      href: "/dashboard/admin/invoice/expiryType",
    },
  ];

  return (
    <div className={`${styles.nav} px-2 ${language == "ar" && "me-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`safqa-scroll-x mb-3`}>
        <div className={`${theme == "dark" ? styles.buttons_dark : styles.buttons} rounded-3 p-3 px-3`}>
          {invoicesLinks.map((item) => (
            (<Link
              key={item.href}
              href={item.href}
              className={`${styles.btn} ${pathname === item.href && styles.active
                } rounded-3`}>

              {i18n.language == 'ar' ? item.label_AR : item.label}

            </Link>)
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavAdminInvoice;
