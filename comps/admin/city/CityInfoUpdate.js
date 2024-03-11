import styles from "../../../styles/Dashboard/Create.module.css";
import {
  SafqaInput,
  SafqaFileInput,
  SafqaSelect,
} from "../../Dashboard/Inputs";
import { MagicBtn } from "../../Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { createCitySchema } from "../../../lib/validations/en/citySchema";
import { createCity, ResetSuccess, updateCity } from "../../../store/slices/citySlice";
import { useTheme } from "next-themes";
import { createCitySchemaAr } from "../../../lib/validations/ar/citySchemaAr";

const CityInfoUpdate = ({cityInfo}) => {
  const { theme } = useTheme();

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter()
  const dispatch = useDispatch();

  const { countries } = useSelector(state => state.country);


  const { isLoading, api_errors, success } = useSelector(
    (state) => state.city
  );

  const defaultValues = cityInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createCitySchema : createCitySchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/admin/address/city")
  }, [success]);

  const onSubmit = (data) => dispatch(updateCity(data));

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.city_info")}</p>
        <hr />

        {/* name_en, name_ar, code */}
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.name_En")}
              name="name_en"
              type="text"
              register={register}
              error={errors.name_en?.message || api_errors?.name_en}
              required
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.name_Ar")}
              type="text"
              name="name_ar"
              register={register}
              required
              error={errors.name_ar?.message || api_errors?.name_ar}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaSelect 
select_label
              options={countries}
              option_name="name_en"
              option_name_ar="name_ar"
              name="country_id"
              register={register}
              label={t("dashboard.country")}
              required
              error={errors.country_id?.message || api_errors?.country_id}
            />
          </div>
        </div>
      </div>

      <MagicBtn label={t("dashboard.save")} isLoading={isLoading} />
    </form>
  );
};

export default CityInfoUpdate;
