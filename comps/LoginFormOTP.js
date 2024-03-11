import Link from "next/link";
import MailIcon from "@mui/icons-material/Mail";
import SmsIcon from '@mui/icons-material/Sms';
import LockIcon from "@mui/icons-material/Lock";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Aos from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authThunk, otpVerify } from "../store/slices/authSlice";
import { shallowEqual, useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginOPTSchema, loginSchema } from "./../lib/validations/en/loginSchema";
import styles from "../styles/login/Login.module.css";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { loginOPTSchemaAr } from "../lib/validations/ar/loginSchemaAr";


export default function LoginFormOTP() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { isLoading, token, api_errors, credentials } = useSelector(
    (state) => state.auth
  );
  const email = getCookie("email");
  const password = getCookie("password");
  const defaultValues = { email, password } || credentials;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(language == 'en' ? loginOPTSchema : loginOPTSchemaAr),
    defaultValues,
    mode: 'all'
  });

  const onSubmit = (data) => {
    dispatch(otpVerify({ ...data }));
  };

  return (
    <form
      data-aos="slide-left"
      data-aos-offset="100"
      className={`mx-auto `}
      onSubmit={handleSubmit(onSubmit)}
      dir={language == "ar" ? "rtl" : "ltr"}
    >
      <div className={`${styles.wrapper} safqa-darkgrey4-color  ${styles.input_container}`}>
        <SmsIcon className="mt-2" sx={{ color: "#afafaf" }} />
        <input
          type="text"
          placeholder={t("dashboard.verification_code")}
          className={`${styles.input_field} shadow-none `}
          {...register("verification_code")}
          defaultValue={defaultValues.verification_code}
        />
      </div>
      {errors.verification_code?.message && (
        <span className="text-danger">{errors.verification_code.message}</span>
      )}

      {api_errors && (
        <>
          <br />
          <span className=" text-danger">{api_errors}</span>
        </>
      )}
      <button
        type="submit"
        className={` btn w-100 mt-3 rounded-3 safqa-bgmain-gradient safqa-white-color ${styles.btn_login} ${isLoading && "opacity-50"
          }`}
        disabled={isLoading && true}
      >
        {isLoading && <LoadingSpinner />}
        <span>{t("dashboard.submit")}</span>
      </button>
      <Link
        href="/login"
        type="button"
        className="mt-3 fw-semibold safqa-text-primary">

        {t("links.login")}

      </Link>
    </form>
  );
}
