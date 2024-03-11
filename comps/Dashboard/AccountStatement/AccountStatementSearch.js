import styles from "../../../styles/Dashboard/Search.module.css";
import SelectFourOptions from "../../SelectFourOptions";
import { BtnSearch } from "../../../Buttons";
import { MagicInput } from "../../Inputs";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const AccountStatementSearch = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div
      className={`mt-2 mb-4 ${language == "ar" && "ms-4"}`}
      dir={language == "ar" ? "rtl" : "ltr"}
    >
      <div
        className={`row rounded-2 me-4 ms-1 px-4 p-3 ${
          theme == "dark" ? styles.info_dark : styles.info
        }`}
      >
        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 mb-3">
          <MagicInput label={t("dashboard.description")} required />
        </div>

        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 mb-3">
          <SelectFourOptions
            label={t("dashboard.entry_method")}
            option1={t("dashboard.all")}
            option2={t("dashboard.paid")}
            option3={t("dashboard.unpaid")}
            option4={t("dashboard.pending")}
          />
        </div>

        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 mb-3">
          <MagicInput required label={t("dashboard.date_from")} type="date" />
        </div>

        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 mb-3">
          <MagicInput required label={t("dashboard.date_to")} type="date" />
        </div>

        <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 mb-3 text-center ">
          <div className="mt-2">
            <BtnSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStatementSearch;
