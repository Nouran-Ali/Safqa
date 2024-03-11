import { useRouter } from "next/router";
import styles from "../../../styles/Dashboard/Navs.module.css";
import Link from "next/link"
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const NavSetting = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { pathname } = router;

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const invoicesLinks = [
    {
      label: "Manage users",
      label_AR: " ادارة المستخدمين",
      href: "/dashboard/setting/manageUsers",
    },
    {
      label: "Integration",
      label_AR: " التكامل",
      href: "/dashboard/setting/integration",
    },
    // {
    //   label: "Invoice design",
    //   label_AR: " تصميم الفاتورة",
    //   href: "#",
    // },
    {
      label: "Addresses",
      label_AR: " عناوين",
      href: "/dashboard/setting/addresses",
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
              className={`${styles.btn} ${pathname.includes(item.href) && styles.active
                } rounded-3`}>

              {i18n.language == 'ar' ? item.label_AR : item.label}

            </Link>)
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavSetting;
