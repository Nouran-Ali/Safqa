import styles from "../../../../styles/Dashboard/Create.module.css";
import Link from "next/link";
import {
  SafqaInput,
} from "../../../Dashboard/Inputs";
import { MagicBtn } from "../../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { createContactphonesSchema } from "../../../../lib/validations/en/contactPhoneSchema";
import { createContactphonesSchemaAr } from "../../../../lib/validations/ar/contactPhoneSchemaAr";
import { createContactPhone, ResetSuccess } from "../../../../store/slices/contactPhoneSlice";

const ContactPhoneInfo = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter()
  const dispatch = useDispatch();

  const { contactPhoneInfo, isLoading, api_errors, success } = useSelector(
    (state) => state.contactPhone
  );

  const defaultValues = contactPhoneInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createContactphonesSchema : createContactphonesSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/admin/contact/phones")
  }, [success]);

  const onSubmit = (data) => dispatch(createContactPhone(data));

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.ContactPhone_info")}</p>
        <hr />

        <div className="row px-3">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.type")}
              name="type"
              type="text"
              register={register}
              error={errors.type?.message || api_errors?.type}
              required
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.number")}
              type="text"
              name="number"
              register={register}
              required
              error={errors.number?.message || api_errors?.number}
            />
          </div>
        </div>
      </div>

      <MagicBtn label={t("dashboard.create")} isLoading={isLoading} />
    </form>
  );
};

export default ContactPhoneInfo;
