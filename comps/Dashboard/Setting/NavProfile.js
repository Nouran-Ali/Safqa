import { useRouter } from "next/router";
import styles from "../../../styles/Dashboard/Navs.module.css";
import Link from "next/link"
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const NavProfile = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { pathname, query: { profile_id } } = router;
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const invoicesLinks = [
    {
      label: "Profile Info",
      label_AR: "معلومات الصفحة الشخصية",
      href: `/dashboard/admin/profile/${profile_id}`,
      pathname: `/dashboard/admin/profile/[profile_id]`,
    },
    {
      label: "Manage users",
      label_AR: " ادارة المستخدمين",
      href: `/dashboard/admin/profile/${profile_id}/users`,
      pathname: `/dashboard/admin/profile/[profile_id]/users`,
    },
    {
      label: "Documents",
      label_AR: "الوثائق",
      href: `/dashboard/admin/profile/${profile_id}/docs`,
      pathname: `/dashboard/admin/profile/[profile_id]/docs`,
    },
    {
      label: "Transactions",
      label_AR: "المعاملات",
      href: `/dashboard/admin/profile/${profile_id}/transactions`,
      pathname: `/dashboard/admin/profile/[profile_id]/transactions`,
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
              className={`${styles.btn} ${pathname === item.pathname && styles.active
                } rounded-3`}>

              {i18n.language == 'ar' ? item.label_AR : item.label}

            </Link>)
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavProfile;
