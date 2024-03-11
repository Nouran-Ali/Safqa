import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import styles from "../../../styles/Dashboard/Navs.module.css";
import Link from "next/link"
import { useTheme } from "next-themes";

const NavInvoices = () => {
  const router = useRouter();
  const { pathname } = router;

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { theme } = useTheme();

  const invoicesLinks = [
    {
      label: "Invoices",
      label_AR: "الفواتير",
      href: "/dashboard/invoices",
    },
    // {
    //   label: "Quick Invoices",
    //   label_AR: "فواتير سريعة",
    //   href: "/dashboard/invoices/quick",
    // },
    {
      label: "Payment link",
      label_AR: "رابط الدفع",
      href: "/dashboard/invoices/payments",
    },
    {
      label: "Speed Pay",
      label_AR: "الدفع السريع",
      href: "/dashboard/invoices/speedPay",
    },
  ];

  return (
    <div className={`${styles.nav}  ${language == "ar" && "me-3 ms-3"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`safqa-scroll-x mb-3`}>
        <div className={`${theme == "dark" ? styles.buttons_dark : styles.buttons} rounded-3 p-3 px-3`}>
          {invoicesLinks.map((item) => (
            (<Link
              key={item.href}
              href={item.href}
              className={`${styles.btn} ${pathname === item.href && styles.active
                }  rounded-3`}>

              {i18n.language == 'ar' ? item.label_AR : item.label}

            </Link>)
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavInvoices;
