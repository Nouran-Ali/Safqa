import styles from "../../../styles/Dashboard/Create.module.css";
import { MagicSelectInput, MagicRadioInput } from "../Inputs";
import SectionGradient from "../SectionGradient";
import { useTranslation } from "react-i18next";

const ConsolidatedTaxInvoiceForm = () => {

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div dir={language == "ar"  ? "rtl" : "ltr"}>
      <div className={` p-3 px-4 rounded-3 ${language == "en" ? "me-3" : "me-5"} ${styles.note}`}>
        <p className="text-dark">
          {t("dashboard.noteTaxInvoice")}
        </p>
      </div>
      <form className={`mt-2 mb-4 ${language == "ar" && "me-5"}`}>
        <div className={`row rounded-2 pb-3 ${language == "en" && "me-4"}`}>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <MagicSelectInput
              label={t("dashboard.date")}
              options={[
                { name: "Choose", id: "0" },
              ]}
              required={true}
            />
          </div>

          <div className="row px-4 mt-3 mb-4">
            <MagicRadioInput
              label={t("dashboard.language")}
              firstLabel={t("dashboard.english")}
              secondLabel={t("dashboard.arabic")}
              firstValue="1"
              secondValue="0"
            />
          </div>
        </div>
        <div className={styles.btn_download}>
          <SectionGradient text={t("dashboard.download")} />
        </div>
      </form>
    </div>
  );
};

export default ConsolidatedTaxInvoiceForm;
