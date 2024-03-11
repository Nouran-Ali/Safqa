import styles from "../../../styles/Dashboard/Create.module.css";
import {
  MagicInput,
  SafqaInput,
  SafqaPhoneInput,
  MagicSelectInput,
  SafqaSelect,
  SafqaAutoComplete,
} from "../Inputs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const CustomerInfo = ({
  register,
  errors,
  api_errors,
  inputs,
  control,
  setValue,
}) => {
    const { theme } = useTheme();
  const dispatch = useDispatch();
  const { customerInfo } = useSelector((state) => state.invoice);
  const { customers } = useSelector((state) => state.customer);
  const {
    customer_name,
    // send_invoice_option_id,
    customer_mobile_code_id,
    customer_mobile,
    customer_email,
    customer_reference,
  } = customerInfo;

  const { send_invoice_option_id } = inputs;

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.customer_info")}</p>
        <hr />
        <div className="row px-3">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaAutoComplete
              type="text"
              required
              control={control}
              label={t("dashboard.customer_name")}
              name="customer_name"
              options={customers.map(option => {
                option = {
                  ...option,
                  value: option.full_name
                }
                return option
              })}
              onSelect={(data) => customers.map(option => {
                if (option.full_name == data) {
                  return (
                    setValue(`customer_email`, option.email),
                    setValue(`customer_mobile_code_id`, option.country?.id),
                    setValue(`customer_mobile`, option.phone_number),
                    setValue(`customer_reference`, option.customer_reference)
                  )
                }
              })}
              error={errors?.customer_name?.message || api_errors?.customer_name}
              placeholder={"Youssef Wael"}

            />
          </div>

          {
            <SendInvoiceOption
              send_invoice_option_id={send_invoice_option_id}
              register={register}
              api_errors={api_errors}
              errors={errors}
              control={control}
              setValue={setValue}
            />
          }

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 px-4 mt-3">
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

const SendInvoiceOption = ({
  send_invoice_option_id,
  register,
  api_errors,
  errors,
  control,
  setValue
}) => {

  const [t, i18n] = useTranslation();


  const sendInvoiceOptions = [
    // { id: 1, name: "SMS", name_ar: "رسالة قصيرة" },
    { id: 2, name: "Email", name_ar: "البريد الإلكتروني" },
    // { id: 3, name: "Link", name_ar: "الرابط" },
  ];


  let result;
  switch (+send_invoice_option_id) {
    case 1:
      result = (
        <SafqaPhoneInput
          label={t("dashboard.customer_phone_number")}
          placeholder="1010932484"
          required
          flag="are"
          phone_name="customer_mobile"
          code_name="customer_mobile_code_id"
          register={register}
          error={errors.customer_mobile?.message || api_errors?.customer_mobile}
          codeError={errors.customer_mobile_code_id?.message || api_errors?.customer_mobile_code_id}
        />
      );
      break;
    case 2:
      result = (
        <SafqaInput
          // className="mb-3"
          type="email"
          label={t("dashboard.customer_email")}
          placeholder="example@gmail.com"
          required
          name="customer_email"
          register={register}
          error={errors.customer_email?.message || api_errors?.customer_email}
        />
      );
      break;
  }

  return (
    <>
      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
        <SafqaSelect
          select_label
          label={t("dashboard.send_invoice_by")}
          required
          name="send_invoice_option_id"
          option_name="name"
          option_name_ar="name_ar"
          register={register}
          options={sendInvoiceOptions}
          error={
            errors.send_invoice_option_id?.message ||
            api_errors?.send_invoice_option_id
          }
        />
      </div>
      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">{result}</div>
    </>
  );
};

export default CustomerInfo;
