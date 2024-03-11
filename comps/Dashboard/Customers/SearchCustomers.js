import styles from "../../../styles/Dashboard/Search.module.css";
import { MagicInput, SafqaInput, SafqaPhoneInput, MagicPhoneInput } from "../Inputs";
import { BtnReset, BtnSearch } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchCustomersSchema } from "../../../lib/validations/en/customerSchema";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { filterCustomers, getCustomers } from "../../../store/slices/customerSlice";
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from "next-themes";
import { searchCustomersSchemaAr } from "../../../lib/validations/ar/customerSchemaAr";

const SearchCustomers = () => {
  const dispatch = useDispatch()
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { searchInfo, customers } = useSelector(state => state.customer)

  const defaultValues = searchInfo;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(language == 'en' ? searchCustomersSchema : searchCustomersSchemaAr)
  })


  const { full_name, customer_reference, phone_number } = watch()

  useEffect(() => {
    dispatch(filterCustomers({ full_name, customer_reference, phone_number }))
  }, [full_name, customer_reference, phone_number])



  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <form
        className={`row rounded-2 me-4 ms-1 px-4 p-3 ${theme == 'dark' ? styles.info_dark : styles.info}`}
      >
        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-3">
          <SafqaInput
            label={t("dashboard.customer_name")}
            name="full_name"
            register={register}
            error={errors.full_name?.message}
            required

          />
        </div>

        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
          <SafqaInput
            label={t("dashboard.phone_number")}
            name="phone_number"
            register={register}
            error={errors.phone_number?.message}
            required
          />
        </div>

        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-3">
          <SafqaInput
            label={t("dashboard.customer_reference")}
            name="customer_reference"
            register={register}
            required
            error={errors.customer_reference?.message}
          />
        </div>

        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-3 text-center">
          {/* <BtnSearch /> */}
          <BtnReset onClick={()=> reset()}/>
        </div>
      </form>
    </div>
  );
};

export default SearchCustomers;
