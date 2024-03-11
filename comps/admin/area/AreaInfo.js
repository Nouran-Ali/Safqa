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
import { createArea, ResetSuccess } from "../../../store/slices/areaSlice";
import { createAreaSchema } from "../../../lib/validations/en/areaSchema";
import { useTheme } from "next-themes";
import { createAreaSchemaAr } from "../../../lib/validations/ar/areaSchemaAr";

const AreaInfo = () => {
  const { theme } = useTheme();

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const router = useRouter()
  const dispatch = useDispatch();

  const { cities } = useSelector(state => state.city);

  const { areaInfo, isLoading, api_errors, success } = useSelector(
    (state) => state.area
  );

  const defaultValues = areaInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createAreaSchema : createAreaSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/admin/address/area")
  }, [dispatch, router, success]);

  const onSubmit = (data) => dispatch(createArea(data));

  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.area_info")}</p>
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
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaSelect
              select_label
              options={cities}
              option_name="name_en"
              option_name_ar="name_ar"
              name="city_id"
              register={register}
              label={t("dashboard.city")}
              required
              error={errors.city_id?.message || api_errors?.city_id}
            />
          </div>
        </div>
      </div>

      <MagicBtn label={t("dashboard.create")} isLoading={isLoading} />
    </form>
  );
};

export default AreaInfo;
