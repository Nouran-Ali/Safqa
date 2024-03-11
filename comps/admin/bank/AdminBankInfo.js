import styles from "../../../styles/Dashboard/Create.module.css";
import Link from "next/link";
import {
  SafqaInput, SafqaRadioInput, SafqaSelect,
} from "../../Dashboard/Inputs";
import { MagicBtn } from "../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { createBankSchema } from "../../../lib/validations/en/bankScehma";
import { createBankSchemaAr } from "../../../lib/validations/ar/bankSchemaAr";
import { createBank, ResetSuccess } from "../../../store/slices/bankSlice";

const AdminBankInfo = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter()
  const dispatch = useDispatch();

  const { countries } = useSelector(state => state.country);
  const { bankInfo, isLoading, api_errors, success } = useSelector(
    (state) => state.bank
  );

  const defaultValues = bankInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createBankSchema : createBankSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/admin/bank")
  }, [dispatch, router, success]);

  const onSubmit = (data) => dispatch(createBank(data));

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.bank_info")}</p>
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

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaSelect
              select_label
              options={countries}
              option_name="name_en"
              option_name_ar="name_ar"
              name="country_id"
              register={register}
              label={t("dashboard.country")}
              required
              error={errors.country_id?.message || api_errors?.country_id}
            />
          </div>
          
        </div>

        <div className="row px-3">
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

      <MagicBtn label={t("dashboard.create")} isLoading={isLoading} />
    </form>
  );
};

export default AdminBankInfo;
