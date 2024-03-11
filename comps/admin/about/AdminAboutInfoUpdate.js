import styles from "../../../styles/Dashboard/Create.module.css";
import Link from "next/link";
import {
  SafqaInput, SafqaTextArea,
} from "../../Dashboard/Inputs";
import { MagicBtn } from "../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { createAboutSchema } from "../../../lib/validations/en/aboutSchema";
import { createAboutSchemaAr } from "../../../lib/validations/ar/aboutSchemaAr";
import { ResetSuccess, updateAbout } from "../../../store/slices/aboutSlice";

const AdminAboutInfoUpdate = ({ aboutInfo }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter()
  const dispatch = useDispatch();

  const { isLoading, api_errors, success } = useSelector(
    (state) => state.about
  );

  const defaultValues = aboutInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createAboutSchema : createAboutSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/admin/about")
  }, [dispatch, router, success]);

  const onSubmit = (data) => dispatch(updateAbout(data));

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.about_info")}</p>
        <hr />

        <div className="row px-3">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 px-4 mt-3">
            <SafqaTextArea
              label={t("dashboard.about")}
              name="about"
              type="text"
              register={register}
              error={errors.about?.message || api_errors?.about}
              required
              rows={4}
            />
          </div>
        </div>
      </div>

      <MagicBtn label={t("dashboard.save")} isLoading={isLoading} />
    </form>
  );
};

export default AdminAboutInfoUpdate;
