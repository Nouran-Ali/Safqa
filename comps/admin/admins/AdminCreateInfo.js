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
  SafqaPhoneInput,
} from "../../Dashboard/Inputs";
import { MagicBtn } from "../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { createCountrySchema } from "../../../lib/validations/en/countrySchema";
import { createCountry } from "../../../store/slices/countrySlice";
import { useTheme } from "next-themes";
import { createAdmin, ResetSuccess } from "../../../store/slices/adminSlice";
import { createAdminSchema } from "../../../lib/validations/en/adminScehma";
import { createAdminSchemaAr } from "../../../lib/validations/ar/adminScehmaAr";

const AdminCreateInfo = ({ register, errors, api_errors }) => {
  const {myData} = useSelector(state=>state.auth) 
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.admin_info")}</p>
        <hr />

        {/* name_en, name_ar, code */}
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.name")}
              name="name"
              type="text"
              register={register}
              error={errors.name?.message || api_errors?.name}
              required
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.email")}
              type="text"
              name="email"
              register={register}
              required
              error={errors.email?.message || api_errors?.email}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaPhoneInput
              label={t("dashboard.phone")}
              register={register}
              phone_name="phone"
              code_name="phone_number_code_id"
              required
              error={errors.phone?.message || api_errors?.phone}
              codeError={errors.phone_number_code_id?.message || api_errors?.phone_number_code_id}
            />
          </div>

          {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaSelect
              select_label
              options={[
                { id: 0, name_en: "No", name_ar: "لا" },
                { id: 1, name_en: "Yes", name_ar: "نعم" },
              ]}
              option_name="name_en"
              option_name_ar="name_ar"
              label={t("dashboard.is_super_admin")}
              name="is_super_admin"
              register={register}
              required
              error={errors.is_super_admin?.message || api_errors?.is_super_admin}
              disabled={!myData.is_super_admin}
            />
          </div> */}
        </div>

      </div>

    </div>
  );
};

export default AdminCreateInfo;
