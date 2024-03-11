import styles from "../../../styles/Dashboard/BankDetails.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const BankDetails = () => {
  const { profile_business } = useSelector(state => state.profileBusiness);
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={` ${styles.BankDetails} ${language == "ar" ? "me-5" : "w-75"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
          <div className="mb-3">
            <label className="mb-2">{t("dashboard.bank_name")}</label>
            <input
              className="form-control shadow-none"
              type="text"
              placeholder={profile_business?.bank[language == 'en' ? 'name_en' : 'name_ar']}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="mb-2">{t("dashboard.bank_account")}</label>
            <input
              className="form-control shadow-none"
              type="text"
              placeholder={profile_business?.account_number}
              disabled
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
          <div className="mb-3">
            <label className="mb-2">{t("dashboard.bank_account_holder_name")}</label>
            <input
              className="form-control shadow-none"
              type="text"
              placeholder={profile_business?.bank_account_name}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="mb-2">{t("dashboard.IBAN")}</label>
            <input
              className="form-control shadow-none"
              type="text"
              placeholder={profile_business?.iban}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
