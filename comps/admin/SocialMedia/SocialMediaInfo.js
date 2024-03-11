import styles from "../../../styles/Dashboard/Create.module.css";
import Link from "next/link";
import {
  SafqaFileInput,
  SafqaInput,
} from "../../Dashboard/Inputs";
import { MagicBtn } from "../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { createSocialMedia, ResetSuccess } from "../../../store/slices/socialMediaSlice";
import { createSocialMediaSchema } from "../../../lib/validations/en/socialMediaSchema";
import { useTheme } from "next-themes";
import { createSocialMediaSchemaAr } from "../../../lib/validations/ar/socialMediaSchemaAr";

const SocialMediaInfo = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter()
  const dispatch = useDispatch();

  const { socialMediaInfo, createLoading, api_errors, success } = useSelector(
    (state) => state.socialMedia
  );

  const defaultValues = socialMediaInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createSocialMediaSchema : createSocialMediaSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/admin/socialMedia")
  }, [dispatch, router, success]);

  const onSubmit = (data) => dispatch(createSocialMedia(data));

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.socialMedia_info")}</p>
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
              type="text"
              name="name_ar"
              register={register}
              required
              error={errors.name_ar?.message || api_errors?.name_ar}
            />
          </div>
        </div>

        <div className="row px-3">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaFileInput
              name="icon"
              label={t("dashboard.icon")}
              register={register}
              error={errors.icon?.message || api_errors?.icon}
              required
            />
          </div>
        </div>

      </div>

      <MagicBtn label={t("dashboard.create")} isLoading={createLoading} />
    </form>
  );
};

export default SocialMediaInfo;
