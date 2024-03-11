import styles from "../../../styles/Dashboard/Create.module.css";
import {
  MagicInput,
  SafqaInput,
  SafqaPhoneInput,
  SafqaSelect,
} from "../Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const CustomerInfo = ({ errors, api_errors, register, watch }) => {
    const { theme } = useTheme();
  const { country } = useSelector(state=>state.global.data)

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar"  ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.customer_info")}</p>
        <hr />
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              type="text"
              label={t("dashboard.first_name")}
              placeholder="Mohamed"
              required
              name="first_name"
              register={register}
              error={errors.first_name?.message || api_errors?.full_name}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              type="text"
              label={t("dashboard.last_name")}
              placeholder="Youssef"
              required
              name="last_name"
              register={register}
              error={errors.last_name?.message || api_errors?.full_name}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaPhoneInput
              label={t("dashboard.customer_mobile")}
              register={register}
              phone_name="phone_number"
              code_name="phone_number_code_id"
              required
              error={errors.phone_number?.message || api_errors?.phone_number}
              codeError={errors.phone_number_code_id?.message || api_errors?.phone_number_code_id}
              watch={watch}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 my-3">
            <SafqaInput
              type="email"
              label={t("dashboard.email")}
              placeholder="example@gmail.com"
              required
              name="email"
              register={register}
              error={errors.email?.message || api_errors?.email}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 my-3">
            <SafqaInput
              type="text"
              label={t("dashboard.customer_reference")}
              name="customer_reference"
              register={register}
              error={
                errors.customer_reference?.message ||
                api_errors?.customer_reference
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
