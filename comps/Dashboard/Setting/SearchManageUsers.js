import styles from "../../../styles/Dashboard/Search.module.css";
import {MagicInput, SafqaInput} from "../Inputs";
import {BtnReset, BtnSearch} from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { searchManageUserSchema } from "../../../lib/validations/en/manageUserSchema";
import { searchManageUserSchemaAr } from "../../../lib/validations/ar/manageUserSchemaAr";
import { filterManageUsers } from "../../../store/slices/manageUserSlice";
import { useTheme } from "next-themes";

const SearchManageUsers = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const dispatch = useDispatch()

  const { searchInfo } = useSelector(
    (state) => state.manageUser
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
    resolver: yupResolver(language == 'en' ? searchManageUserSchema : searchManageUserSchemaAr),
    defaultValues,
  });

  const { user_name, phone_number, email } = watch()

  useEffect(() => {
    dispatch(filterManageUsers({ user_name, phone_number, email }))
  }, [ user_name, phone_number, email ])


  return (
    <div className={`mt-2 mb-4 ${language == "ar" && "ms-4"}`} dir={language=="ar" ? "rtl" : "ltr"}>
      <div className={`row rounded-2 me-4 ms-1 px-4 p-3 ${theme == 'dark' ? styles.info_dark : styles.info}`}>
        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-3">
          <SafqaInput
            label={t("dashboard.user_name")}
            name="user_name"
            register={register}
            required
            error={errors.user_name?.message}
          />
        </div>

        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-3">
          <SafqaInput
            label={t("dashboard.email")}
            name="email"
            register={register}
            required
            error={errors.email?.message}
          />
        </div>

        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-3">
          <SafqaInput
            label={t("dashboard.phone_number")}
            name="phone_number"
            register={register}
            required
            error={errors.phone_number?.message}
          />
        </div>

        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-3 text-center">
          <BtnReset onClick={() => reset()} />

        </div>
      </div>
    </div>
  );
};

export default SearchManageUsers;