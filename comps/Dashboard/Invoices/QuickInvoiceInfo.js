import styles from "../../../styles/Dashboard/Create.module.css";
import { MagicBtn } from "../../Buttons";
// import { SafqaInput, SafqaCurrencySelect, SafqaRadioInput } from "../Inputs";
import { useTranslation } from "react-i18next";
import { MagicInput, SafqaInput, SafqaCurrencySelect, SafqaRadioInput, SafqaLanguageRadio, SafqaSelectCommissionType } from "../Inputs";
import { useTheme } from "next-themes";

const QuickInvoiceInfo = ({
  register,
  errors,
  api_errors,
  defaultValues,
  inputs,
}) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4`}>
      <div
        className={`rounded-2 ${
          theme == 'dark' ? styles.info_dark : styles.info
        }`}
        dir={language == 'ar' ? 'rtl' : 'ltr'}
      >
        <p className="px-4 fs-5">{t('dashboard.invoice_info')}</p>
        <hr />
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaCurrencySelect
              required
              name="currency_id"
              register={register}
              error={errors.currency_id?.message || api_errors?.currency_id}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              required
              type="number"
              label={t('dashboard.invoice_value')}
              placeholder="0"
              register={register}
              name="invoice_value"
              error={errors.invoice_value?.message || api_errors?.invoice_value}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaSelectCommissionType
              select_label
              required
              register={register}
              error={
                errors.commission_type?.message || api_errors?.commission_type
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickInvoiceInfo;
