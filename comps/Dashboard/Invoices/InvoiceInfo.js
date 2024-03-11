import styles from "../../../styles/Dashboard/Create.module.css";
import {
  MagicCurrencySelectInput,
  SafqaCurrencySelect,
  MagicInput,
  SafqaInput,
  MagicSelectInput,
  SafqaSelect,
  MagicRadioInput,
  SafqaRadioInput,
  MagicFileInput,
  SafqaFileInput,
  MagicTextArea,
  SafqaTextArea,
  SafqaLanguageRadio,
  SafqaInputWithoutRegister,
  SafqaSelectCommissionType,
} from "../Inputs";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const InvoiceInfo = ({
  register,
  errors,
  api_errors,
  defaultValues,
  inputs,
  setValue
}) => {

  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { active_countries } = useSelector(state => state.country);
  const { recurring_intervals } = useSelector(state => state.recurringInterval);
  const { profile_business } = useSelector(state => state.profileBusiness);

  const { is_discount, discount_type, is_terms, is_open_invoice, recurring_interval_id, currency_id, prductItems } = inputs;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

  const calcTotal = (items) => {
    let total = 0;
    items.map((item) => (total += item.product_price * item.product_quantity));
    return total;
  };

  // useEffect(() => {
    // setValue('max_amount', )
  // }, [active_countries, currency_id, prductItems, setValue])

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

        {/* Is_open_amount */}
        <div className="row px-3">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaSelect
              select_label
              option_name="name"
              option_name_ar="name_ar"
              label={t('dashboard.Is_open_amount')}
              options={[
                { name: 'Fixed', name_ar: 'مُثَبَّت', id: '0' },
                { name: 'Changeable', name_ar: 'قابل للتغيير', id: '1' },
              ]}
              required
              name="is_open_invoice"
              register={register}
              error={
                errors.is_open_invoice?.message || api_errors?.is_open_invoice
              }
            />
          </div>
          {is_open_invoice == 1 && (
            <>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                <SafqaInput
                  type="number"
                  label={t('dashboard.min_amount')}
                  required
                  name="min_invoice"
                  register={register}
                  error={errors.min_invoice?.message || api_errors?.min_invoice}
                />
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                <SafqaInputWithoutRegister
                  type="text"
                  label={t('dashboard.max_amount')}
                  required
                  name="max_amount"
                  value={`${calcTotal(prductItems)} (${
                    currency_id
                      ? active_countries?.find((c) => c.id == currency_id)
                          ?.short_currency
                      : '$'
                  })`}
                  // register={register}
                  error={errors.max_amount?.message || api_errors?.max_amount}
                  disabled
                />
              </div>
            </>
          )}
        </div>

        {/* currency */}
        <div className="row px-3">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaSelect
              select_label
              label={t('dashboard.currency')}
              options={active_countries}
              option_name="currency"
              option_name_ar="currency"
              required
              name="currency_id"
              register={register}
              error={errors.currency_id?.message || api_errors?.currency_id}
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaSelectCommissionType
              select_label
              required
              register={register}
              error={errors.commission_type?.message || api_errors?.commission_type}
            />
          </div>
        </div>

        {/* discount available */}
        <div className="row px-3">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaSelect
              select_label
              option_name="name"
              option_name_ar="name_ar"
              label={t('dashboard.discount_available')}
              options={[
                { name: 'no', name_ar: 'لا', id: '0' },
                { name: 'yes', name_ar: 'نعم', id: '1' },
              ]}
              required
              name="is_discount"
              register={register}
              error={errors.is_discount?.message || api_errors?.is_discount}
            />
          </div>

          {/* Discount value */}
          {is_discount == 1 && (
            <>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                <SafqaSelect
                  select_label
                  option_name="name"
                  option_name_ar="name_ar"
                  label={t('dashboard.discount_type')}
                  options={[
                    { name: 'Fixed Price', name_ar: 'سعر ثابت', id: '0' },
                    { name: 'Rate %', name_ar: 'نسبة مئوية', id: '1' },
                  ]}
                  required
                  name="discount_type"
                  register={register}
                  error={
                    errors.discount_type?.message || api_errors?.discount_type
                  }
                />
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                <SafqaInput
                  type="number"
                  label={
                    discount_type == 0
                      ? `${t('dashboard.discount_value')} (${
                          profile_business?.country?.short_currency
                        })`
                      : `${t('dashboard.discount_value')} (%)`
                  }
                  required
                  name="discount_value"
                  register={register}
                  error={
                    errors.discount_value?.message || api_errors?.discount_value
                  }
                />
              </div>
            </>
          )}
        </div>

        {/* Expiry date */}
        <div className="row px-3">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              type="date"
              label={t('dashboard.expiry_date')}
              required
              name="expiry_date"
              register={register}
              error={errors.expiry_date?.message || api_errors?.expiry_date}
              min={tomorrowFormatted}
            />
          </div>
          <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 px-4 mt-3">
            <label className="form-label">
              {t('dashboard.remind_after')}
              <span className="ms-2">{t('dashboard.optional')}</span>
            </label>
            <div className="d-flex align-items-center">
              <input
                type="number"
                min="0"
                className="form-control border-0 shadow-none"
                {...register('remind_after')}
              />
              <span className="mx-3">{t('dashboard.days')}</span>
            </div>
          </div>

          {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 px-4 mt-3"> */}
          {/* <SafqaInput
              type="time"
              label={t("dashboard.expiry_time")}
              required
              name="expiry_time"
              register={register}
              error={errors.expiry_time?.message || api_errors?.expiry_date}
            /> */}
          {/* </div> */}
        </div>

        {/* Remind after */}
        <div className="row px-3">
          {/* <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 px-4 mt-3">
            <label className="form-label">
              {t("dashboard.remind_after")}<span className="ms-2">{t("dashboard.optional")}</span>
            </label>
            <div className="d-flex align-items-center">
              <input
                type="number"
                min="0"
                className="form-control border-0 shadow-none"
                {...register("remind_after")}
              />
              <span className={language == "en" ? "ms-5" : "me-5"}>{t("dashboard.days")}</span>
            </div>
          </div> */}
          <p className={`mt-2 ${language == 'en' ? 'ms-3' : 'me-3'} `}>
            {t('dashboard.remind_after_p')}
          </p>
        </div>

        {/* Recurring Interval */}
        <div className="row px-3">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-1">
            <SafqaSelect
              select_label
              label={t('dashboard.recurring_interval')}
              options={recurring_intervals}
              option_name={'name_en'}
              option_name_ar={'name_ar'}
              required
              name="recurring_interval_id"
              register={register}
              error={
                errors.recurring_interval_id?.message ||
                api_errors?.recurring_interval_id
              }
            />
          </div>
          {recurring_interval_id > 1 && (
            <>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-1">
                <SafqaInput
                  comment={t('comment.greenwich')}
                  type="date"
                  label={t('dashboard.recurring_start_date')}
                  required
                  name="recurring_start_date"
                  register={register}
                  min={tomorrowFormatted}
                  error={
                    errors.recurring_start_date?.message ||
                    api_errors?.recurring_start_date
                  }
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-1">
                <SafqaInput
                  comment={t('comment.greenwich')}
                  type="date"
                  label={t('dashboard.recurring_end_date')}
                  required
                  name="recurring_end_date"
                  register={register}
                  min={tomorrowFormatted}
                  error={
                    errors.recurring_end_date?.message ||
                    api_errors?.recurring_end_date
                  }
                />
              </div>
            </>
          )}
          {/* <p className={`mt-2 ${language == "en" ? "ms-3" : "me-3"} ${styles.w_90}`}>
            {t("dashboard.recurring_interval_p")}
          </p> */}
        </div>

        {/* language */}
        {/* <div className="row px-4 mt-3">

          <SafqaLanguageRadio
            label={t("dashboard.language_of_the_invoice")}
            name="language_id"
            register={register}
            required
            error={errors.language_id?.message || api_errors?.language_id}
          />

        </div> */}

        {/* attach file */}
        <div className="row px-3">
          <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaFileInput
              label={t('dashboard.attach_file')}
              name="attach_file"
              register={register}
              error={errors.attach_file?.message || api_errors?.attach_file}
            />
          </div>
        </div>

        {/* comments */}
        <div className="row px-3">
          <div className="col px-4 mt-3">
            <SafqaTextArea
              label={t('dashboard.comments')}
              // required={false}
              name="comments"
              register={register}
              error={errors.comments?.message || api_errors?.comments}
            />
          </div>
        </div>

        {/* terms and conditions */}
        <div className="row px-4 mt-3 mb-3">
          <SafqaRadioInput
            label={t('dashboard.terms_conditions')}
            items={[
              { id: 1, name: 'Enable' },
              { id: 0, name: 'Disable' },
            ]}
            defaultValue={defaultValues.is_terms}
            name="is_terms"
            register={register}
            error={errors.is_terms?.message || api_errors?.is_terms}
          />
        </div>

        {is_terms > 0 && (
          <div className="row px-3 mb-3">
            <div className="col px-4">
              <SafqaTextArea
                name="terms_and_conditions"
                register={register}
                error={
                  errors.terms_and_conditions?.message ||
                  api_errors?.terms_and_conditions
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceInfo;
