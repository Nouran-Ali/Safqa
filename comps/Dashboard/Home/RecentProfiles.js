import Link from "next/link";
import Invoice from "../Home/Invoice";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import Profiles from "./Profiles";

const RecentProfiles = () => {

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { theme } = useTheme()

  return (
    <div>
      <div className="d-flex justify-content-between" dir={language == "ar" ? "rtl" : "ltr"}>
        <p className={`fw-bold ${theme == 'dark' ? "text-white" : "text-body"}`}>{t("dashboard.home.Recent_Profiles")}</p>
        <Link href="/dashboard/admin/profile" className={`text-decoration-underline ${theme == 'dark' ? 'text-grey' : ''}`}>
          {t("dashboard.See_all")}
        </Link>
      </div>
      <div>
        <Profiles />
      </div>
    </div>
  );
};

export default RecentProfiles;
