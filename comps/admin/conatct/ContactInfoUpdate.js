import styles from "../../../styles/Dashboard/Create.module.css";
import Link from "next/link";
import {
  MagicInput,
  MagicTextArea,
  MagicRadioInput,
  MagicSelectInput,
  MagicFileInput,
  SafqaSelect,
  SafqaInput,
  SafqaTextArea,
  SafqaFileInput,
  SafqaRadioInput,
  SafqaNewCheckBox,
} from "../../Dashboard/Inputs";
import { MagicBtn } from "../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { ResetSuccess, updateContact } from "../../../store/slices/contactSlice";
import { updateContactSchema } from "../../../lib/validations/en/contactSchema";
import { updateContactSchemaAr } from "../../../lib/validations/ar/contactSchemaAr";
import LoadingSpinner from "../../LoadingSpinner";

const ContactInfoUpdate = () => {

  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter()
  const dispatch = useDispatch();
  const { contacts, success, api_errors, isLoading } = useSelector(state => state.contact)
  console.log("🚀 ~ file: ContactInfoUpdate.js:37 ~ ContactInfoUpdate ~ contacts", contacts)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? updateContactSchema : updateContactSchemaAr),
  });

  useEffect(() => {
    success && dispatch(ResetSuccess())
  }, [success]);

  useEffect(() => {
    if (contacts) {
      setValue('country', contacts.country)
      setValue('city', contacts.city)
      setValue('area', contacts.area)
      setValue('block', contacts.block)
      setValue('avenue', contacts.avenue)
      setValue('street', contacts.street)
      setValue('sales_support_officer_info', contacts.sales_support_officer_info)
      setValue('support_email', contacts.support_email)
    }
  }, [contacts]);

  const onSubmit = (data) => dispatch(updateContact(data));

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>

      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.contact_info")} {isLoading && <LoadingSpinner />}</p>
        <hr />

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.country")}
              name="country"
              type="text"
              register={register}
              error={errors.country?.message || api_errors?.country}
              required
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.city")}
              name="city"
              type="text"
              register={register}
              error={errors.city?.message || api_errors?.city}
              required
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.area")}
              name="area"
              type="text"
              register={register}
              error={errors.area?.message || api_errors?.area}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.block")}
              name="block"
              type="text"
              register={register}
              error={errors.block?.message || api_errors?.block}
              required
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.avenue")}
              name="avenue"
              type="text"
              register={register}
              error={errors.avenue?.message || api_errors?.avenue}
              required
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.street")}
              name="street"
              type="text"
              register={register}
              error={errors.street?.message || api_errors?.street}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.sales_support_officer_info")}
              name="sales_support_officer_info"
              type="text"
              register={register}
              error={errors.sales_support_officer_info?.message || api_errors?.sales_support_officer_info}
              required
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.support_email")}
              name="support_email"
              type="text"
              register={register}
              error={errors.support_email?.message || api_errors?.support_email}
              required
            />
          </div>
        </div>
      </div>

      <MagicBtn label={t("dashboard.save")} isLoading={isLoading} />
    </form>
  );
};

export default ContactInfoUpdate;
