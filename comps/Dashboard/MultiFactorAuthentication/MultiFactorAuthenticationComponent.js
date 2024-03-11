import styles from '../../../styles/Dashboard/Show.module.css'
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const MultiFactorAuthentication = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar"  ? "rtl" : "ltr"}>
      <div className={`rounded-2 me-4 ${theme == 'dark' ? styles.info_dark : styles.info}`}>
        <h5>{t("dashboard.multi_factor_authentication")}</h5>
        <hr />
        <p className="text-dark safqa-responsive-width-75">
          {t("dashboard.multi_factor_authentication_paragraph")}
        </p>
      </div>
    </div>
  );
};

export default MultiFactorAuthentication;
