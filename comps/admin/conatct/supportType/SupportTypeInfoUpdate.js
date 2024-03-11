import styles from "../../../../styles/Dashboard/Create.module.css";
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
} from "../../../Dashboard/Inputs";
import { MagicBtn } from "../../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { createSupportTypeSchema } from "../../../../lib/validations/en/supportTypeSchema";
import { createSupportTypeSchemaAr } from "../../../../lib/validations/ar/supportTypeSchemaAr";
import { ResetSuccess, updateSupportType } from "../../../../store/slices/supportTypeSlice";

const SupportTypeInfoUpdate = ({ supportTypeInfo }) => {
console.log("🚀 ~ file: SupportTypeInfoUpdate.js:29 ~ SupportTypeInfoUpdate ~ supportTypeInfo", supportTypeInfo)

  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter()
  const dispatch = useDispatch();

  const { isLoading, api_errors, success } = useSelector(
    (state) => state.supportType
  );
  
  const defaultValues = supportTypeInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createSupportTypeSchema : createSupportTypeSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/admin/contact/supportType")
  }, [success]);

  const onSubmit = (data) => dispatch(updateSupportType(data));

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.supportType_info")}</p>
        <hr />

        {/* name_en, name_ar, code */}
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.name")}
              name="name"
              type="text"
              register={register}
              error={errors.name?.message || api_errors?.name}
              required
            />
          </div>
        </div>
      </div>

      <MagicBtn label={t("dashboard.save")} isLoading={isLoading} />
    </form>
  );
};

export default SupportTypeInfoUpdate;
