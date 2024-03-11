import { useRouter } from "next/router";
import styles from "../../../styles/Dashboard/NavIntegration.module.css";
import Link from "next/link"
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const NavIntegration = () => {
  const router = useRouter();
  const { pathname } = router;
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const invoicesLinks = [
    {
      label: "API Key",
      label_AR: "مفتاح API",
      href: "/dashboard/setting/integration/apiKey",
    },
    {
      label: "Webhook Setting",
      label_AR: "إعداد Webhook",
      href: "/dashboard/setting/integration",
    },

  ];

  return (
    <div className={`${styles.nav} ${language == "ar" && "me-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`mb-3`}>
        <div className={`${theme == "dark" ? styles.buttons_dark : styles.buttons} p-3 px-3`}>
          {invoicesLinks.map((item) => (
            (<Link
              key={item.href}
              href={item.href}
              className={`${styles.btn} ${styles.btn_webhook} ${pathname === item.href && styles.active
                } p-2 px-5`}>

              {i18n.language == 'ar' ? item.label_AR : item.label}

            </Link>)
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default NavIntegration;