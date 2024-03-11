import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import styles from "../../../styles/Dashboard/Navs.module.css";
import Link from "next/link";
import { useTheme } from "next-themes";

const NavProducts = () => {
  const router = useRouter();
  const { pathname } = router;

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { theme } = useTheme();

  const invoicesLinks = [
    {
      label: "Products Category",
      label_AR: " فئة المنتجات",
      href: "/dashboard/products/category",
    },
    {
      label: "Products",
      label_AR: " المنتجات",
      href: "/dashboard/products",
    },
    {
      label: "Products Links",
      label_AR: "روابط المنتجات",
      href: "/dashboard/products/urls",
    },
    {
      label: "Products Ordered",
      label_AR: " المنتجات المطلوبة",
      href: "/dashboard/products/productsOrdered",
    },
  ];

  return (
    <div className={`${styles.nav} px-2 ${language == "ar" && "me-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`safqa-scroll-x mb-3`}>
        <div className={`${theme == "dark" ? styles.buttons_dark : styles.buttons} rounded-3 p-3 px-3`}>
          {invoicesLinks.map((item) => (
            (<Link
              href={item.href}
              key={item.href}
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

export default NavProducts;
