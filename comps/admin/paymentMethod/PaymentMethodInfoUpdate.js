import styles from "../../../styles/Dashboard/Create.module.css";
import Link from "next/link";
import {
  SafqaFileInput,
  SafqaInput, SafqaRadioInput,
} from "../../Dashboard/Inputs";
import { MagicBtn } from "../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { updatePaymentMethodSchema } from "../../../lib/validations/en/paymentMethodSchema";
import { updatePaymentMethodSchemaAr } from "../../../lib/validations/ar/paymentMethodSchemaAr";
import { ResetSuccess, updatePaymentMethod } from "../../../store/slices/paymentMethodSlice";

const PaymentMethodInfoUpdate = ({ paymentMethodInfo }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter()
  const dispatch = useDispatch();

  const { isLoading, api_errors, success } = useSelector(
    (state) => state.paymentMethod
  );

  const defaultValues = paymentMethodInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? updatePaymentMethodSchema : updatePaymentMethodSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/admin/paymentMethod")
  }, [dispatch, router, success]);

  const onSubmit = (data) => dispatch(updatePaymentMethod(data));

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.businessType_info")}</p>
        <hr />

        <div className="row px-3">
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
              name="name_ar"
              type="text"
              register={register}
              error={errors.name_ar?.message || api_errors?.name_ar}
              required
            />
          </div>
          
        </div>
        <div className="row px-3">
          {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.commission_bank")}
              name="commission_bank"
              type="number"
              register={register}
              error={errors.commission_bank?.message || api_errors?.commission_bank}
              required
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.commission_safqa")}
              name="commission_safqa"
              type="number"
              register={register}
              error={errors.commission_safqa?.message || api_errors?.commission_safqa}
              required
            />
          </div> */}
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaFileInput
              name="logo"
              register={register}
              label={t("dashboard.logo")}
              error={errors.logo?.message || api_errors?.logo}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaRadioInput
              label={t("dashboard.is_active")}
              items={[
                { id: 1, name: t("dashboard.yes") },
                { id: 0, name: t("dashboard.no") },
              ]}
              name="is_active"
              register={register}
              defaultValue={defaultValues.is_active}
              error={errors?.is_active?.message}
            />
          </div>
        </div>
      </div>

      <MagicBtn label={t("dashboard.save")} isLoading={isLoading} />
    </form>
  );
};

export default PaymentMethodInfoUpdate;
