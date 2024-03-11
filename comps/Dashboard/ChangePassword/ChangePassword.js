import styles from "../../../styles/Dashboard/ChangePassword.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  changePasswordThunk,
  ResetSuccess,
} from "../../../store/slices/authSlice";
import { useEffect, useState } from "react";
import LoadingSpinner from "./../../LoadingSpinner";
import { SafqaCheckBox, SafqaInput } from "../Inputs";
import { MagicBtn } from "../../Buttons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from './../../../lib/validations/en/changePasswordSchema';
import { changePasswordSchemaAr } from './../../../lib/validations/ar/changePasswordSchemaAr';
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
// import { SafqaInput, SafqaPasswordInput } from "../../SafqaInputs";

const ChangePassword = () => {
  const { theme } = useTheme();
  const router = useRouter()
  const dispatch = useDispatch();

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { success, api_errors, isLoading, changePassword } = useSelector(
    (state) => state.auth
  );
  const defaultValues = changePassword;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == "en" ? changePasswordSchema : changePasswordSchemaAr),
    defaultValues,
  });


  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard")
  }, [dispatch, router, success]);

  const onSubmit = (data) => {
    dispatch(changePasswordThunk(data));
  };

  return (
    <div className={`${styles.ChangePassword}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <form
        className={language == "en" && "safqa-responsive-width-75"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className={`${theme == 'dark' ? "dark-title" : "text-secondary"} fw-bold mb-4`}>{t("dashboard.change_password")}</h4>
        <div className="mb-3">

          <SafqaInput
            name="old_password"
            register={register}
            className="bg-grey"
            type="password"
            placeholder={t("dashboard.old_password")}
            error={errors.old_password?.message || api_errors?.old_password}
            required
          />
        </div>
        <div className="mb-3">
          <SafqaInput
            name="new_password"
            placeholder={t("dashboard.new_password")}
            register={register}
            className="bg-grey"
            type="password"
            error={errors.new_password?.message || api_errors?.new_password}
            required
          />
        </div>
        <div className="mb-3">
          <SafqaInput
            name="new_password_confirmation"
            placeholder={t("dashboard.new_password_confirmation")}
            register={register}
            className="bg-grey"
            type="password"
            error={
              errors.new_password_confirmation?.message ||
              api_errors?.new_password_confirmation
            }
            required
          />
        </div>

        <div className="text-center mt-3 mb-3">
          <MagicBtn label={t("dashboard.change_password")} isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
