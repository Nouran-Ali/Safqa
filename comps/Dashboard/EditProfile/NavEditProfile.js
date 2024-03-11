import styles from "../../../styles/Dashboard/Navs.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import LoadingSpinner from "../../LoadingSpinner";
import { useSelector } from "react-redux";

const NavEditProfile = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { pathname } = router;

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { isLoading } = useSelector((state) => state.profileBusiness);

  const navItems = [
    {
      href: "businessDetails",
      label: "Business Details",
      label_AR: "تفاصيل العمل",
    },
    {
      href: "bankDetails",
      label: "Bank Details",
      label_AR: " التفاصيل المصرفية",
    },
    {
      href: "socialMedia",
      label: "Social Media",
      label_AR: " وسائل التواصل الاجتماعي",
    },
    {
      href: "documents",
      label: "Documents",
      label_AR: "وثائق ",
    },
  ];

  return (
    <div
      className={`${styles.nav} px-2 `}
      dir={language == "ar" ? "rtl" : "ltr"}
    >
      <div className={`safqa-scroll-x mb-3`}>
        <div
          className={`${
            theme == "dark" ? styles.buttons_dark : styles.buttons
          } rounded-3 p-3 px-3`}
        >
          {navItems.map((item) => {
            return (
              <Link
                key={item.href}
                href={`/dashboard/editProfile/${item.href}`}
                className={`${styles.btn} ${
                  pathname === `/dashboard/editProfile/${item.href}` &&
                  styles.active
                } rounded-3`}
              >
                {i18n.language == "ar" ? item.label_AR : item.label} {"  "}
                {/* {isLoading && item.href == "businessDetails" && <LoadingSpinner />} */}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavEditProfile;
