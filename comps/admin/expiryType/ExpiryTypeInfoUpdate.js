import styles from "../../../styles/Dashboard/Create.module.css";
import {
  SafqaInput, SafqaRadioInput,
} from "../../Dashboard/Inputs";
import { MagicBtn } from "../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { createExpiryType, ResetSuccess, updateExpiryType } from "../../../store/slices/expiryTypeSlice";
import { useTheme } from "next-themes";
import { createRecurringIntervalSchema } from "../../../lib/validations/en/recurringIntervalSchema";
import { updateInvoiceExpirySchema } from "../../../lib/validations/en/invoiceExpirySchema";
import { updateInvoiceExpirySchemaAr } from "../../../lib/validations/ar/invoiceExpirySchemaAr";

const ExpiryTypeInfoUpdate = ({ expiryTypeInfo }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter()
  const dispatch = useDispatch();

  const {  isLoading, api_errors, success } = useSelector(
    (state) => state.expiryType
  );

  const defaultValues = expiryTypeInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? updateInvoiceExpirySchema : updateInvoiceExpirySchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/admin/invoice/expiryType")
  }, [dispatch, router, success]);

  const onSubmit = (data) => dispatch(updateExpiryType(data));

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.invoiceExpiry_info")}</p>
        <hr />

        {/* name_en, name_ar, code */}
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.name_En")}
              name="name_en"
              type="text"
              register={register}
              error={errors.name_en?.message || api_errors?.name_en}
              required
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.name_Ar")}
              type="text"
              name="name_ar"
              register={register}
              required
              error={errors.name_ar?.message || api_errors?.name_ar}
            />
          </div>

          <div className="row px-4 mt-3">
            <SafqaRadioInput
              label={t("dashboard.is_active")}
              items={[
                { id: 1, name: t("dashboard.yes") },
                { id: 0, name: t("dashboard.no") },
              ]}
              name="is_active"
              register={register}
              defaultValue={defaultValues.is_active}
              error={errors?.is_active}
            />
          </div>
        </div>
      </div>

      <MagicBtn label={t("dashboard.save")} isLoading={isLoading} />
    </form>
  );
};

export default ExpiryTypeInfoUpdate;
