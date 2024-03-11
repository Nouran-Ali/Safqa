import Aos from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Select from "react-select";
import { t } from "i18next";
import { setCookie, getCookie } from "cookies-next";
import { joinThunk, ResetSuccess } from "../../store/slices/join";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "./../LoadingSpinner";
import styles from "../../styles/join/Join.module.css";
import { SafqaLanguageRadio, SafqaInput, SafqaRadioInput, SafqaSelect } from "./../Dashboard/Inputs";
import { managerInformationSchema } from "../../lib/validations/en/joinSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { managerInformationSchemaAr } from "../../lib/validations/ar/joinSchemaAr";

function ManagerInformation({ handleNext, handleBack, joinValues, setJoinValues }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { managerInformation, isLoading, api_errors, success } = useSelector((state) => state.join);
  const { data: { country, languages } } = useSelector((state) => state.global);
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const defaultValues = managerInformation;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(language == 'en' ? managerInformationSchema : managerInformationSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/login")
  }, [success, dispatch, router]);

  const onSubmit = (data) => {
    // alert(JSON.stringify({ ...joinValues, ...data }))
    dispatch(joinThunk({ ...joinValues, ...data }));
  };

  return (
    <form
      data-aos="slide-left"
      data-aos-offset="100"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      {/* manager Name */}
      <SafqaInput
        className="form-control border-0 shadow-none"
        type="text"
        placeholder={t("input.managerfullname")}
        required
        defaultValue={defaultValues.full_name}
        register={register}
        name="full_name"
        error={errors.full_name?.message || api_errors?.full_name}
      />

      {/* manager email */}
      <SafqaInput
        className="form-control border-0 mt-3 shadow-none"
        type="text"
        placeholder={t("input.emailRequired")}
        required
        defaultValue={defaultValues.email}
        register={register}
        name="email"
        error={errors.email?.message || api_errors?.email}
      />


      <div className="d-flex input-group">
        <select
          className={` form-control  w-25 mt-3 border-0 shadow-none`}
          {...register("phone_number_code_manager_id")}
        >
          <option value="" >
            {t("join.countryCode")}
          </option>
          {country?.map((c) => {
            if (c.country_active) {
              return (
                <option
                  key={c.id}
                  value={c.id}
                >
                  {c.code}
                </option>
              )
            }
          })}
        </select>

        <SafqaInput
          className="form-control border-0 mt-3 w-75 shadow-none"
          type="text"
          placeholder={t("input.managermobilenumber")}
          required
          defaultValue={defaultValues.phone_number_manager}
          register={register}
          name="phone_number_manager"
          error={
            errors.phone_number_manager?.message ||
            api_errors?.phone_number_manager
          }
        />
      </div>

      {/* password */}
      <SafqaInput
        className="form-control border-0 mt-3 shadow-none"
        type="password"
        placeholder={t("input.password")}
        required
        defaultValue={defaultValues.password}
        register={register}
        name="password"
        error={errors.password?.message || api_errors?.password}
      />

      {/* password confirmation */}
      <SafqaInput
        className="form-control border-0 mt-3 shadow-none"
        type="password"
        placeholder={t("input.confirmpassword")}
        required
        defaultValue={defaultValues.password_confirmation}
        register={register}
        name="password_confirmation"
        error={
          errors.password_confirmation?.message ||
          api_errors?.password_confirmation
        }
      />

      {/* nationality */}
      <SafqaSelect
        select_label={t('dashboard.nationality')}
        className="form-control border-0 mt-3 shadow-none"
        register={register}
        name="nationality_id"
        required
        options={country}
        option_name="nationality_en"
        option_name_ar="nationality_ar"
        error={errors.nationality_id?.message}
      />

      <div className="text-center mt-4 mb-4">
        <button
          type="button"
          className={`safqa-text-primary safqa-grey5-bg fw-normal px-5 p-2 ms-3 rounded-3 border-0`}
          onClick={handleBack}
        >
          {t("links.back")}
        </button>

        <button
          type="submit"
          className={`safqa-bgmain-gradient safqa-white-color fw-normal px-5 p-2 ms-3 rounded-3 border-0`}
        >
          {isLoading ? <LoadingSpinner /> : language == "en" ? "Submit" : "ارسال"}
        </button>
      </div>
    </form>
  );
}

export default ManagerInformation;
