import styles from "../../../styles/Dashboard/help/LeaveAMessage.module.css";
import { SafqaTextArea, SafqaFileInput, SafqaSelect } from "../Inputs";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactMessageSchema } from "../../../lib/validations/en/contactSchema";
import { useEffect } from "react";
import { MagicBtn } from "../../Buttons";
import { createMessage, ResetSuccess } from "../../../store/slices/messageSlice";
import { contactMessageSchemaAr } from "../../../lib/validations/ar/contactSchemaAr";

const LeaveAMessage = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const router = useRouter()
  const dispatch = useDispatch();

  const { support_types } = useSelector((state) => state.supportType);
  const { messageInfo, success, api_errors, isLoading } = useSelector((state) => state.message);
  const defaultValues = messageInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? contactMessageSchema : contactMessageSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && reset()
  }, [dispatch, reset, success]);

  const onSubmit = (data) => {
    console.log(data)
    dispatch(createMessage(data));
  };


  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "me-3 ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <form className={`rounded-2 me-4 ${styles.info}`} onSubmit={handleSubmit(onSubmit)}>
        <h5>{t("dashboard.leave_a_message")}</h5>
        <hr />

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mt-3">
            <SafqaSelect
              select_label
              label={t("dashboard.support_type")}
              options={support_types}
              option_name="name"
              option_name_ar="name"
              required
              name="support_type_id"
              register={register}
              error={errors.support_type_id?.message || api_errors?.support_type_id}
            />
          </div>
          <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 mt-3">
            <SafqaFileInput
              // required
              label={t("dashboard.add_file")}
              name="image_file"
              register={register}
              error={errors.image_file?.message || api_errors?.image_file}
            />
          </div>
        </div>

        <div className="row mt-3">
          <SafqaTextArea
            name="message"
            register={register}
            error={errors.message?.message || api_errors?.message}
          />
        </div>

        <MagicBtn
          isLoading={isLoading}
          label={t("dashboard.create")}
          disabled={false}
        />

      </form>
    </div>
  );
};

export default LeaveAMessage;
