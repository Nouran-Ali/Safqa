import styles from "../../../styles/Dashboard/Search.module.css";
import { MagicInput, SafqaInput } from "../Inputs";
import SelectThreeOptions from "../SelectThreeOptions";
import { BtnReset, BtnSearch } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { searchProductSchema } from "../../../lib/validations/en/productSchema";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { filterProducts } from "../../../store/slices/productSlice";
import { useTheme } from "next-themes";
import { searchProductSchemaAr } from "../../../lib/validations/ar/productLinkSchemaAr";

const SearchRefunds = () => {

  const [t, i18n] = useTranslation();
  const { language } = i18n;
  
  const dispatch = useDispatch()
  const { theme } = useTheme();

  const { searchInfo } = useSelector(
    (state) => state.refund
  );


  const defaultValues = searchInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? searchProductSchema : searchProductSchemaAr),
    defaultValues,
  });

  const { product_name, category_name } = watch()

  useEffect(() => {
    dispatch(filterProducts({ product_name, category_name }))
  }, [product_name, category_name])

  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <div className={`row rounded-2 me-4 ms-1 px-4 p-3 ${theme == 'dark' ? styles.info_dark : styles.info}`}>

        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
          <SafqaInput
            name={"product_name"}
            register={register}
            required
            label={t("dashboard.product_name")}
            error={errors.product_name?.message}
          />

        </div>

        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
          <SafqaInput
            name={"category_name"}
            register={register}
            required
            label={t("dashboard.product_category")}
            error={errors.category_name?.message}
          />
        </div>

        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 mb-3 text-center">
          {/* <BtnSearch /> */}
          <BtnReset onClick={() => reset()} />
        </div>
      </div>
    </div>
  );
};

export default SearchRefunds;
