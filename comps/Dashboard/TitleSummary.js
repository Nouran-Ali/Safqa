import Link from "next/link";
import { useTranslation } from "react-i18next";

const TitleSummary = () => {

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className="d-flex align-items-center" dir={language == "ar"  ? "rtl" : "ltr"}>
      <div className="me-4">
        <Link href="/dashboard" className={`mx-auto`}>

          <img src="/logo.png" alt="logo" className="mx-auto" width="60px"/>

        </Link>
      </div>
      <div className={language == "en" ? "ms-5" : "me-5 mt-3"}>
        <h4 className="text-dark fw-bold">{t("dashboard.summary_of_monthly_tax_invoices")}</h4>
        <p className="text-muted fw-bold fs-5">01/09/2022</p>
      </div>
    </div>
  );
};

export default TitleSummary;
