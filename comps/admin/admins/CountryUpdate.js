import styles from "../../../styles/Dashboard/Create.module.css";
import {
  SafqaInput,
  SafqaFileInput,
  SafqaRadioInput,
} from "../../Dashboard/Inputs";
import { MagicBtn } from "../../Buttons";
import {
  ResetSuccess,
} from "../../../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { updateCountrySchema } from "../../../lib/validations/en/countrySchema";
import { updateCountry } from "../../../store/slices/countrySlice";
import { useTheme } from "next-themes";
import { updateCountrySchemaAr } from "../../../lib/validations/ar/countrySchemaAr";

const CountryUpdate = ({ country }) => {
  const { theme } = useTheme();

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter()
  const dispatch = useDispatch();

  const { imageUrl, isLoading, api_errors, success } = useSelector(
    (state) => state.country
  );

  const defaultValues = country

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? updateCountrySchema : updateCountrySchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/admin/address/country")
  }, [success]);

  const onSubmit = (data) => dispatch(updateCountry(data));

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.country_info")}</p>
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

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              name="code"
              register={register}
              type="text"
              label={t("dashboard.code")}
              required
              error={errors.code?.message || api_errors?.code}
            />
          </div>
        </div>

        {/* nationality_en, nationality_ar, flag */}
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.nationality_en")}
              name="nationality_en"
              type="text"
              register={register}
              error={errors.nationality_en?.message || api_errors?.nationality_en}
              required
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.nationality_ar")}
              type="text"
              name="nationality_ar"
              register={register}
              required
              error={errors.nationality_ar?.message || api_errors?.nationality_ar}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaFileInput
              name="flag"
              register={register}
              label={t("dashboard.flag")}
              error={errors.flag?.message || api_errors?.flag}
            />
          </div>
        </div>

        {/* currency, short_currency */}
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.currency")}
              name="currency"
              type="text"
              register={register}
              error={errors.currency?.message || api_errors?.currency}
              required
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.short_currency")}
              type="text"
              name="short_currency"
              register={register}
              required
              error={errors.short_currency?.message || api_errors?.short_currency}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaRadioInput
              label={t("dashboard.country_active")}
              items={[
                { id: 1, name: t("dashboard.yes") },
                { id: 0, name: t("dashboard.no") },
              ]}
              name="country_active"
              register={register}
              defaultValue={defaultValues.country_active}
              error={errors?.country_active?.message}
            />
          </div>
        </div>

      </div>

      <MagicBtn label={t("dashboard.save")} isLoading={isLoading} />
    </form>
  );
};

export default CountryUpdate;
