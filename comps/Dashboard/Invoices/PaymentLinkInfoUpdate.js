import styles from "../../../styles/Dashboard/Create.module.css";
import { MagicBtn } from "../../Buttons";
import {
  MagicInput,
  SafqaInput,
  SafqaSelect,
  SafqaCurrencySelect,
  SafqaRadioInput,
  SafqaTextArea,
  SafqaLanguageRadio,
  SafqaSelectCommissionType
} from "../Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createPaymentLink,
  ResetSuccess,
  updatePaymentLink,
} from "./../../../store/slices/paymentLinkSlice";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { createPaymentLinkSchema } from "../../../lib/validations/en/paymentLinkSchema";
import { useRouter } from "next/router";
import { createPaymentLinkSchemaAr } from "../../../lib/validations/ar/paymentLinkSchemaAr";

const PaymentLinkInfoUpdate = ({ paymentLinkInfo }) => {

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { profile_business } = useSelector(state => state.profileBusiness);
  const { myData: { nationality } } = useSelector(state => state.auth);

  const { success, api_errors, isLoading } = useSelector(
    (state) => state.paymentLink
  );

  const { countries } = useSelector(
    (state) => state.country
  );

  const defaultValues = { ...paymentLinkInfo, is_terms: paymentLinkInfo.terms_and_conditions ? 1 : 0 };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createPaymentLinkSchema : createPaymentLinkSchemaAr),
    defaultValues,
  });

  const inputs = watch();

  const { is_terms, open_amount, payment_amount, max_amount } = inputs

  useEffect(() => {
    if (success) {
      dispatch(ResetSuccess())
      reset()
      router.push('/dashboard/invoices/payments')
    }
  }, [dispatch, reset, router, success]);

  useEffect(() => {
    console.log(errors);

    return () => {
      errors;
    };
  }, [errors]);
  


  useEffect(() => {
    setValue('currency_id', nationality?.id)
    setValue('language_id', language == 'en' ? '2' : '1')
  }, [language, nationality?.id, setValue, success])

  useEffect(() => {
    if (open_amount == "1") {
      setValue('max_amount', payment_amount)
      // setValue('payment_amount', max_amount)
    } else {
      setValue('max_amount', 0)
      setValue('min_amount', 0);
      // setValue('payment_amount', max_amount || payment_amount || 0)
    }
  }, [open_amount, payment_amount, setValue])


  const onSubmit = (data) => {
    dispatch(updatePaymentLink(data));
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={`mt-2 mb-4`}>
        <div
          className={`rounded-2 ${
            theme == 'dark' ? styles.info_dark : styles.info
          }`}
          dir={language == 'ar' ? 'rtl' : 'ltr'}
        >
          <p className="px-4 fs-5">{t('dashboard.payment_link_info')}</p>
          <hr />
          <div className="row px-3">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
              <SafqaInput
                label={t('dashboard.payment_title')}
                type="text"
                register={register}
                name="payment_title"
                required
                error={
                  errors.payment_title?.message || api_errors?.payment_title
                }
              />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
              <SafqaSelect
                select_label
                label={t('dashboard.currency')}
                options={countries}
                option_name="currency"
                option_name_ar="currency"
                required
                name="currency_id"
                register={register}
                error={errors.currency_id?.message || api_errors?.currency_id}
              />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
              {/* <MagicInput required label="Payment value" /> */}
              {open_amount == '1' ? (
                <SafqaInput
                  label={t('dashboard.payment_value')}
                  type="number"
                  register={register}
                  name={'max_amount'}
                  required
                  disabled
                  // error={errors.payment_amount?.message || api_errors?.payment_amount}
                />
              ) : (
                <SafqaInput
                  label={t('dashboard.payment_value')}
                  type="number"
                  register={register}
                  name={'payment_amount'}
                  required
                  error={
                    errors.payment_amount?.message || api_errors?.payment_amount
                  }
                />
              )}
            </div>
          </div>

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
                name="open_amount"
                register={register}
                error={errors.open_amount?.message || api_errors?.open_amount}
              />
            </div>
            {open_amount == 1 && (
              <>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                  <SafqaInput
                    type="number"
                    label={t('dashboard.min_amount')}
                    required
                    name="min_amount"
                    register={register}
                    error={errors.min_amount?.message || api_errors?.min_amount}
                  />
                </div>

                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                  <SafqaInput
                    type="number"
                    label={t('dashboard.max_amount')}
                    required
                    name="max_amount"
                    register={register}
                    error={errors.max_amount?.message || api_errors?.max_amount}
                  />
                </div>
              </>
            )}
          </div>

          <div className="row px-3">
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
            {/* <div className="px-4 mt-3 mb-3">
              <SafqaLanguageRadio
                required
                firstLabel={t("dashboard.english")}
                secondLabel={t("dashboard.arabic")}
                firstValue="1"
                secondValue="2"
                register={register}
                name="language_id"
                label={t("dashboard.language_of_the_payment_link")}
                defaultValue={defaultValues.language_id}
                error={errors.language_id?.message || api_errors?.language_id}

              />
            </div> */}
          </div>

          <div className="row px-3">
            <div className="col px-4 mt-3">
              <SafqaTextArea
                label={t('dashboard.comments')}
                register={register}
                name="comment"
                error={errors.comment?.message || api_errors?.comment}
              />
            </div>
          </div>

          <div className="row px-4 mt-3 mb-3">
            <SafqaRadioInput
              items={[
                { id: 1, name: t('dashboard.enable') },
                { id: 0, name: t('dashboard.disable') },
              ]}
              register={register}
              name="is_terms"
              label={t('dashboard.terms_conditions')}
              defaultValue={defaultValues.is_terms}
              error={errors.is_terms?.message || api_errors?.is_terms}
            />
          </div>

          {inputs.is_terms == 1 && (
            <div className="row px-4 mt-3 mb-3">
              <SafqaTextArea
                label={t('dashboard.terms_and_conditions')}
                register={register}
                name="terms_and_conditions"
                error={
                  errors.terms_and_conditions?.message ||
                  api_errors?.terms_and_conditions
                }
                required
              />
            </div>
          )}
        </div>
        <div className="mt-4">
          <MagicBtn isLoading={isLoading} label={t('dashboard.save')} />
        </div>
      </div>
    </form>
  );
};

export default PaymentLinkInfoUpdate;
