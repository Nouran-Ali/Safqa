import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCookie, getCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/join/Join.module.css";
import { SafqaInput, SafqaSelect } from "./../Dashboard/Inputs";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingSpinner from "./../LoadingSpinner";
import { companyInformationSchema } from "./../../lib/validations/en/joinSchema";
import { companyInformationSchemaAr } from "../../lib/validations/ar/joinSchemaAr";

export default function CompanyInformation({ handleNext, handleBack }) {
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { data } = useSelector((state) => state.global);
  const { country, category } = data;
  const { companyInformation, success } = useSelector((state) => state.join);
  const defaultValues = companyInformation;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(
      language == "en" ? companyInformationSchema : companyInformationSchemaAr
    ),
    defaultValues,
  });

  useEffect(() => {
    if (success)
      setTimeout(() => {
        reset();
      }, 5000);
  }, [success, reset]);

  return (
    <form
      data-aos="slide-left "
      data-aos-offset="100"
      onSubmit={handleSubmit(handleNext)}
      className={`${styles.form} w-lg-70 w-md-90`}
    >
      {/* company name */}
      <SafqaInput
        className="form-control border-0 shadow-none"
        type="text"
        placeholder={t("input.legalcompanyname")}
        required
        defaultValue={defaultValues.company_name}
        register={register}
        name="company_name"
        error={errors.company_name?.message}
      />

      {/* brand name en */}
      <SafqaInput
        className="form-control border-0 mt-3 shadow-none"
        type="text"
        placeholder={t("input.companybrandnameEN")}
        required
        defaultValue={defaultValues.name_en}
        register={register}
        name="name_en"
        error={errors.name_en?.message}
      />

      {/* brand name ar */}
      <SafqaInput
        className="form-control border-0 mt-3  shadow-none"
        type="text"
        placeholder={t("input.companybrandnameAR")}
        required
        defaultValue={defaultValues.name_ar}
        register={register}
        name="name_ar"
        error={errors.name_ar?.message}
      />

      <div className="d-flex input-group">
        {/* country code */}
        <select
          className={` form-control w-25 mt-3 border-0 shadow-none`}
          {...register("phone_number_code_id")}
        >
          <option value="">{t("join.countryCode")}</option>

          {country?.map((c) => {
            if (c.country_active) {
              return (
                <option key={c.id} value={c.id}>
                  {c.code}
                </option>
              );
            }
          })}
        </select>

        <SafqaInput
          className="form-control border-0 mt-3 w-75 shadow-none"
          type="text"
          placeholder={t("input.companyphonenumber")}
          required
          defaultValue={defaultValues.phone_number}
          register={register}
          name="phone_number"
          // error={errors.phone_number?.message}
        />
        {(errors.phone_number_code_id || errors.phone_number) && (
          <div className="m-0 list-unstyled">
            <p className="m-0 text-danger">
              {errors.phone_number_code_id?.message}
            </p>
            <p className="m-0 text-danger">{errors.phone_number?.message}</p>
          </div>
        )}
      </div>

      <SafqaInput
        className="form-control border-0 mt-3 shadow-none"
        type="text"
        placeholder={t("input.companyemail")}
        required
        defaultValue={defaultValues.work_email}
        register={register}
        name="work_email"
        error={errors.work_email?.message}
      />

      <select
        className="categories-select form-select border-0 mt-3 shadow-none"
        aria-label="Default select example"
        {...register("category_id")}
        id="category_id"
      >
        <option value="">{t("select.Categories")}</option>

        {category?.length > 0 &&
          category?.map((c) => (
            <option key={c.id} value={c.id}>
              {language == "en" ? c.name_en : c.name_ar}
            </option>
          ))}
      </select>

      {errors.category_id && (
        <span className="text-danger fs-6">{errors.category_id?.message}</span>
      )}

      <div className="text-center mt-4 mb-4">
        <button
          type="button"
          className={`safqa-main-color safqa-grey5-bg fw-normal px-5 p-2 ms-3 rounded-3 border-0`}
          onClick={handleBack}
        >
          {t("links.back")}
        </button>

        <button
          type="submit"
          className={`safqa-bgmain-gradient safqa-white-color fw-normal px-5 p-2 ms-3 rounded-3 border-0`}
          // disabled={!isValid}
        >
          {t("links.next")}
        </button>
      </div>
    </form>
  );
}
