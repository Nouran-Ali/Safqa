import styles from "../../../styles/Dashboard/Search.module.css";
import { MagicInput, SafqaInput } from "../Inputs";
import SelectTwoOptions from "../SelectTwoOptions";
import { BtnReset, BtnSearch } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { searchInvoiceSchema } from "../../../lib/validations/en/invoiceSchema";
import { searchInvoiceSchemaAr } from "../../../lib/validations/ar/invoiceSchemaAr";
import { filterInvoices } from "../../../store/slices/invoiceSlice";

const SearchPaymentLinks = () => {

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const dispatch = useDispatch();

  const { searchInfo } = useSelector(
    (state) => state.invoice
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
    resolver: yupResolver(language == 'en' ? searchInvoiceSchema : searchInvoiceSchemaAr),
    defaultValues,
  });

  const { theme } = useTheme();
  const { customer_name } = watch()


  useEffect(() => {
    dispatch(filterInvoices({ customer_name }))
  }, [customer_name])



  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "ms-4"}`} dir={language == "ar" ? "rtl" : "ltr"}>
      <form className={`row rounded-2 me-4 ms-1 px-4 p-3 ${theme == 'dark' ? styles.info_dark : styles.info}`}>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-3">
          <SafqaInput
            required
            label={t("dashboard.customer_name")}
            register={register}
            name="customer_name"
            error={errors.customer_name?.message}
          />        </div>

        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 mb-3 text-center">
          <BtnReset onClick={() => reset()} />
        </div>
      </form>
    </div>
  );
};

export default SearchPaymentLinks;
