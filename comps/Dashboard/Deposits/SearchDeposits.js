import styles from "../../../styles/Dashboard/Search.module.css";
import { MagicInput } from "../Inputs";
import { BtnSearch } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const SearchDeposits = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "ms-4"}`} dir={language=="ar" ? "rtl" : "ltr"}>
      <div className={`row rounded-2 me-4 ms-1 px-4 p-3 ${theme == 'dark' ? styles.info_dark : styles.info}`}>
        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-3">
          <MagicInput required label={t("dashboard.deposit_reference")} />
        </div>

        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-3">
          <MagicInput required label={t("dashboard.bank_name")} />
        </div>

        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-3">
          <MagicInput type="date" required label={t("dashboard.date")} />
        </div>

        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-3 text-center ">
          <BtnSearch />
        </div>
      </div>
    </div>
  );
};

export default SearchDeposits;
