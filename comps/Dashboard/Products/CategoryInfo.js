import styles from "../../../styles/Dashboard/Create.module.css";
import {
  MagicInput,
  SafqaInput,
  MagicRadioInput,
  SafqaRadioInput,
} from "../Inputs";
import {
  createCategory,
  ResetSuccess,
} from "./../../../store/slices/categorySlice";
import { MagicBtn } from "../../Buttons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCategorySchema } from "./../../../lib/validations/en/categorySchema";
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next";
// import { SafqaInput, SafqaRadio } from "../../SafqaInputs";
import { Space } from "antd";
import { createCategorySchemaAr } from "../../../lib/validations/ar/categorySchemaAr";
import { useTheme } from "next-themes";

const CategoryInfo = () => {
    const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  

  const { categoryInfo, success, isLoading, api_errors, is_active_list } = useSelector(
    (state) => state.category
  );

  const defaultValues = categoryInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createCategorySchema : createCategorySchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/products/category")
  }, [dispatch, router, success]);

  const onSubmit = (data) => {
    dispatch(createCategory(data));
  };

  

  return (
    <div>
      <form
        className={`mt-2 mb-4`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar"  ? "rtl" : "ltr"}>
          <p className="px-4 fs-5">{t("dashboard.create_a_new_category")}</p>
          <hr />

          <div className="row">

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                <SafqaInput
                  type="text"
                  register={register}
                  name="name_en"
                  label={t("dashboard.name_En")}
                  error={errors.name_en?.message || api_errors?.name_en}
                  required
                />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
                <SafqaInput
                  type="text"
                  register={register}
                  name="name_ar"
                  label={t("dashboard.name_Ar")}
                  error={errors.name_ar?.message || api_errors?.name_ar}
                  required
                />
            </div>
          </div>

          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
              <SafqaRadioInput
                label={t("dashboard.is_active")}
                register={register}
                name="is_active"
                items={is_active_list}
                error={errors.is_active?.message || api_errors?.is_active}
              />
            </div>
          </div>

        </div>
        <MagicBtn label={t("dashboard.create")} isLoading={isLoading} />
      </form>
    </div>
  );
};

export default CategoryInfo;
