import styles from "../../../styles/Dashboard/Create.module.css";
// import { MagicBtn } from "../../Buttons";
import { MagicRadioInput, MagicInput, SafqaCheckBox, SafqaRadioInput, SafqaInput, SafqaNewCheckBox } from "../Inputs";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { webhookSchema } from "../../../lib/validations/en/webhookSchema";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetSuccess, storeWebHook } from "../../../store/slices/integrationSlice";
import { useEffect } from "react";
import { webhookSchemaAr } from "../../../lib/validations/ar/webhookSchemaAr";
import { MagicBtn } from "../../Buttons";
import WebhookEvents from "./WebhookEvents";


const WebhookSetting = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { webhookInfo, isLoading, api_errors, success } = useSelector(
    (state) => state.integration
  );

  const roleList = [
    {
      label: t("dashboard.transaction_status_changed"),
      name: 'transaction_status_changed'
    },
    {
      label: t("dashboard.balance_transferred"),
      name: 'balance_transferred'
    },
    {
      label: t("dashboard.recurring_status_changed"),
      name: 'recurring_status_changed'
    },
    {
      label: t("dashboard.refund_status_changed"),
      name: 'refund_status_changed'
    },
    {
      label: t("dashboard.supplier_status_changed"),
      name: 'supplier_status_changed'
    },
  ]

  const defaultValues = webhookInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? webhookSchema : webhookSchemaAr),
    defaultValues,
  });

  const { enable_secret_key } = watch()

  useEffect(() => {
    if (success) {
      dispatch(ResetSuccess())
      reset()
    }
  }, [dispatch, reset, success]);

  const onSubmit = (data) => {
    // reset()
    dispatch(storeWebHook(data));
  };


  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div className={` ${language == "ar" && "w-100"}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <div className={`row ${language == "ar" && "me-3"}`}>
          <div className="col-12">
            <div className="mb-3">
              <SafqaRadioInput
                label={t("dashboard.enable_webhook")}
                items={[
                  { id: 1, name: t("dashboard.yes") },
                  { id: 0, name: t("dashboard.no") },
                ]}
                name="enable_webhook"
                register={register}
                defaultValue={defaultValues.enable_webhook}
                error={errors?.enable_webhook}
              />
            </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
            <div className="mb-3">
              <SafqaInput
                className={'bg-grey'}
                name="endpoint"
                register={register}
                type="text"
                label={t("dashboard.endpoint")}
                required
                error={errors.endpoint?.message || api_errors?.Endpoint}
              />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <SafqaRadioInput
                label={t("dashboard.enable_secret_key")}
                items={[
                  { id: 1, name: t("dashboard.yes") },
                  { id: 0, name: t("dashboard.no") },
                ]}
                name="enable_secret_key"
                register={register}
                defaultValue={defaultValues.enable_secret_key}
                error={errors?.enable_secret_key}
              />
            </div>
          </div>


          {
            enable_secret_key == 1 &&
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
              <div className="mb-3">
                <SafqaInput
                  className={'bg-grey'}
                  name="webhook_secret_key"
                  register={register}
                  type="text"
                  label={t("dashboard.webhook_secret_key")}
                  required
                  error={errors.webhook_secret_key?.message || api_errors?.webhook_secret_key}
                />
              </div>
            </div>
          }


          <WebhookEvents register={register} roleList={roleList} />

        </div>
      </div>
      <MagicBtn label={t("dashboard.create")} isLoading={isLoading} text_center_none />
    </form>
  );
};

export default WebhookSetting;
