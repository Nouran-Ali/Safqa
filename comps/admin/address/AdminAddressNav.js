import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import styles from "../../../styles/Dashboard/Navs.module.css";
import Link from "next/link"
import { useTheme } from "next-themes";

const AdminAddressNav = () => {
  const router = useRouter();
  const { pathname } = router;

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { theme } = useTheme();

  const addressLinks = [
    {
      label: "Countries",
      label_AR: "الدول",
      href: "/dashboard/admin/address/country",
    },
    {
      label: "Cities",
      label_AR: "المدن",
      href: "/dashboard/admin/address/city",
    },
    {
      label: "Areas",
      label_AR: "المناطق",
      href: "/dashboard/admin/address/area",
    },
    {
      label: "Address Types",
      label_AR: "انواع العنوان",
      href: "/dashboard/admin/address/type",
    },
  ];

  return (
    <div className={`${styles.nav} px-2 ${language == "ar" && "me-3 ms-3"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`safqa-scroll-x mb-3`}>
        <div className={`${theme == "dark" ? styles.buttons_dark : styles.buttons} rounded-3 p-3 px-3`}>
          {addressLinks.map((item) => (
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

export default AdminAddressNav;
