import Aos from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { setCookie, getCookie } from "cookies-next";
import { useSelector } from "react-redux";
import styles from "../../styles/join/Join.module.css";
import { SafqaInput, SafqaSelect } from './../Dashboard/Inputs';
import { bankInAccountDetailsSchema } from "../../lib/validations/en/joinSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankInAccountDetailsSchemaAr } from "../../lib/validations/ar/joinSchemaAr";

export default function BankAccountDetails({ handleNext, handleBack, joinValues, setJoinValues }) {
  const country_id = getCookie('country_id');
  const { data: { banks } } = useSelector((state) => state.global);
  const filtered_banks = banks.filter(bank => +bank.country_id === +country_id && bank.is_active)
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { bankAccountDetails, success } = useSelector((state) => state.join);
  const defaultValues = bankAccountDetails;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(language == 'en' ? bankInAccountDetailsSchema : bankInAccountDetailsSchemaAr),
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
      data-aos="slide-left"
      data-aos-offset="100"
      onSubmit={handleSubmit(handleNext)}
      className={styles.form}
    >
      <SafqaInput
        className="form-control border-0 shadow-none"
        type="text"
        placeholder={t("input.legalcompanyname")}
        required
        defaultValue={defaultValues.bank_account_name}
        register={register}
        name="bank_account_name"
        error={errors.bank_account_name?.message}
      />

      <SafqaSelect
        select_label={t('dashboard.bank_name')}
        className="form-control border-0 mt-3 shadow-none"
        register={register}
        name="bank_id"
        required
        options={filtered_banks}
        option_name="name_en"
        option_name_ar="name_ar"
        error={errors.bank_id?.message}
      />

      <SafqaInput
        className="form-control border-0 mt-3 shadow-none"
        type="text"
        placeholder={t("input.accountnumber")}
        required
        defaultValue={defaultValues.account_number}
        register={register}
        name="account_number"
        error={errors.account_number?.message}
      />

      <SafqaInput
        className="form-control border-0 mt-3 shadow-none"
        type="text"
        placeholder={t("input.IBAN")}
        required
        defaultValue={defaultValues.iban}
        register={register}
        name="iban"
        error={errors.IBAN?.message}
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
        // disabled={!isValid}
        >
          {t("links.next")}
        </button>
      </div>
    </form>
  );
}
