import styles from "../../../styles/Dashboard/Create.module.css";
import Link from "next/link";
import {
  SafqaInput,
} from "../../Dashboard/Inputs";
import { MagicBtn } from "../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { createLanguageSchema } from "../../../lib/validations/en/languageSchema";
import { createLanguageSchemaAr } from "../../../lib/validations/ar/languageSchemaAr";
import { createLanguage, ResetSuccess } from "../../../store/slices/languageSlice";

const LanguageInfo = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter()
  const dispatch = useDispatch();

  const { languageInfo, isLoading, api_errors, success } = useSelector(
    (state) => state.language
  );

  const defaultValues = languageInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createLanguageSchema : createLanguageSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/admin/language")
  }, [success]);

  const onSubmit = (data) => dispatch(createLanguage(data));

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.language_info")}</p>
        <hr />

        <div className="row px-3">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.name")}
              name="name"
              type="text"
              register={register}
              error={errors.name?.message || api_errors?.name}
              required
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.short_name")}
              type="text"
              name="short_name"
              register={register}
              required
              error={errors.short_name?.message || api_errors?.short_name}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              name="slug"
              register={register}
              type="text"
              label={t("dashboard.slug")}
              required
              error={errors.slug?.message || api_errors?.slug}
            />
          </div>
        </div>

      </div>

      <MagicBtn label={t("dashboard.create")} isLoading={isLoading} />
    </form>
  );
};

export default LanguageInfo;
