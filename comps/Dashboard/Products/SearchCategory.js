import styles from "../../../styles/Dashboard/Search.module.css";
import { MagicInput, SafqaInput, SafqaSelect } from "../Inputs";
import SelectThreeOptions from "../SelectThreeOptions";
import { BtnReset, BtnSearch } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchCategorySchemaAr } from "../../../lib/validations/ar/categorySchemaAr";
import { searchCategorySchema } from "../../../lib/validations/en/categorySchema";
import { filterCategories } from "../../../store/slices/categorySlice";
import { useEffect } from "react";
import { useTheme } from "next-themes";

const SearchCategory = () => {

  const dispatch = useDispatch()

  const { theme } = useTheme();

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { categoryInfo } = useSelector(
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
    resolver: yupResolver(language == 'en' ? searchCategorySchema : searchCategorySchemaAr),
    defaultValues,
  });

  const { name_en, name_ar } = watch()

  useEffect(() => {
    dispatch(filterCategories({ name_en, name_ar }))
  }, [name_en, name_ar])

  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <form className={`row rounded-2 me-4 ms-1 px-4 p-3 ${theme == 'dark' ? styles.info_dark : styles.info}`}>

        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
          <SafqaInput
            name={"name_en"}
            register={register}
            required
            label={t("dashboard.name_En")}
            error={errors.name_en?.message}
          />

        </div>

        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
          <SafqaInput
            name={"name_ar"}
            register={register}
            required
            label={t("dashboard.name_Ar")}
            error={errors.name_ar?.message}
          />
        </div>

        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3 text-center">
          {/* <BtnSearch /> */}
          <BtnReset onClick={() => reset()} />
        </div>
      </form>
    </div>
  );
};

export default SearchCategory;
