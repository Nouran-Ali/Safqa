import styles from "../../../styles/Dashboard/Create.module.css";
import {
  MagicInput,
  SafqaInput,
  SafqaPhoneInput,
} from "../Inputs";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const CustomerInfoUpdate = ({ errors, api_errors, register, watch }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`}>
        <p className="px-4 fs-5">Customer info</p>
        <hr />
        <div className="row">

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              type="text"
              label="Full name"
              placeholder="Youssef"
              required
              name="full_name"
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

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">

            <SafqaInput
              type="email"
              label="Email"
              placeholder="example@gmail.com"
              required
              name="email"
              register={register}
              error={errors.email?.message || api_errors?.email}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              type="text"
              label="Customer Reference"
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

export default CustomerInfoUpdate;
