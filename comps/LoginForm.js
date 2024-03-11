import Link from "next/link";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Aos from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authThunk } from "../store/slices/authSlice";
import { shallowEqual, useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./../lib/validations/en/loginSchema";
import styles from "../styles/login/Login.module.css";
import { setCookie, getCookie, deleteCookie} from "cookies-next";
import { loginSchemaAr } from "../lib/validations/ar/loginSchemaAr";


export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  // const { isLoading, token, api_errors, credentials } = useSelector(
  //   (state) => state.auth
  // );
  const [isRemember, setIsRemember] = useState(false)
  const email = getCookie("email");
  const password = getCookie("password");
  const defaultValues = {email, password} || credentials;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(language == 'en' ? loginSchema : loginSchemaAr),
    defaultValues,
    mode: 'all'
  });

  const inputs = watch();


  // const onSubmit = (data) => {
  //   dispatch(authThunk(data));
  // };

  // const rememberMe = (e) => {
  //   setIsRemember(curr => !curr)
  //   if (e.target.checked) {
  //     const { email, password } = inputs;
  //     setCookie("email", email);
  //     setCookie("password", password);
  //   }else{
  //     deleteCookie("email")
  //     deleteCookie("password")
  //   }
  // };

  return (
    <form
      data-aos="slide-left"
      data-aos-offset="100"
      className={`mx-auto `}
      // onSubmit={handleSubmit(onSubmit)}
      dir={language == "ar" ? "rtl" : "ltr"}
    >
      <div className={`${styles.wrapper} safqa-darkgrey4-color  ${styles.input_container}`}>
        <MailIcon className="mt-2" sx={{ color: "#afafaf" }} />
        <input
          type="email"
          placeholder={t("input.email")}
          className={`${styles.input_field} shadow-none `}
          {...register("email")}
          defaultValue={defaultValues.email}
        />
        <span
          className={`${styles.underline} safqa-bginfo3-color ${
            errors.email?.message && "text-danger"
          }`}
        ></span>
      </div>
      {errors.email?.message && (
        <span className="text-danger">{errors.email.message}</span>
      )}
      <br />
      <div className={`${styles.wrapper} ${styles.input_container}`}>
        <LockIcon className="mt-2" sx={{ color: "#afafaf" }} />
        <input
          type="password"
          placeholder={t("input.password")}
          className={`${styles.input_field} shadow-none `}
          {...register("password")}
          defaultValue={defaultValues.password}

        />
        <span className={`${styles.underline} safqa-bginfo3-color`}></span>
      </div>
      {errors.password?.message && (
        <span className="text-danger">{errors.password.message}</span>
      )}

      <br />

      <Link
        href="/forgetPassword"
        className={`fs-6 text-decoration-underline ${language == "en" ? "float-end" : "float-start"} mt-1 mb-3 safqa-info3-color`}>

        {t("links.forgotpassword")}

      </Link>
      
      <div className={` ${styles.form_check} form-check ${language == "en" ? "float-start" : "float-end"}  mt-1 mb-3`}>
        <input
          className="form-check-input shadow-none"
          type="checkbox"
          {...register("remember_me")}
          id="flexCheckDefault"
          // onChange={rememberMe}
          checked={isRemember}
          // defaultValue={defaultValues.remember_me}

        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          {t("input.rememberme")}
        </label>
      </div>
      <br />
      {/* {api_errors && (
        <>
          <br />
          <span className=" text-danger">{api_errors}</span>
        </>
      )} */}
      <button
        type="submit"
        className={` btn w-100 mt-3 rounded-3 safqa-bgmain-gradient safqa-white-color ${styles.btn_login}
        `}
        // disabled={isLoading && true}
      >
        {/* {isLoading && <LoadingSpinner />} */}
        <span>{t("links.login")}</span>
      </button>
      <Link
        href="/join"
        type="button"
        className="mt-3 fw-semibold safqa-text-primary">

        {t("links.join")}

      </Link>
    </form>
  );
}
