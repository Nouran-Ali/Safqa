import { useRouter } from "next/router";
import styles from "../../../styles/Dashboard/Navs.module.css";
import Link from "next/link"
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const NavAdminContacts = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { pathname } = router;

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const invoicesLinks = [
    {
      label: "Contact",
      label_AR: "اتصال",
      href: "/dashboard/admin/contact",
    },
    {
      label: "contact phones",
      label_AR: "هواتف الإتصال",
      href: "/dashboard/admin/contact/phones",
    },
    {
      label: "Messages",
      label_AR: "رسائل",
      href: "/dashboard/admin/contact/messages",
    },
    {
      label: "Support Types",
      label_AR: "أنواع الدعم",
      href: "/dashboard/admin/contact/supportType",
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

export default NavAdminContacts;
