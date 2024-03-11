import styles from "../../../styles/Dashboard/Create.module.css";
import showStyles from "../../../styles/Dashboard/Show.module.css";

import {
  MagicInput,
  SafqaInput,
  MagicRadioInput,
  SafqaRadioInput,
  SafqaFileInput,
  SafqaTextArea,
} from "../Inputs";
import {
  createCategory,
  ResetSuccess,
} from "./../../../store/slices/categorySlice";
import { BtnDownload, BtnShowImg, MagicBtn } from "../../Buttons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { updateStoreSchema } from "../../../lib/validations/en/storeSchema";
import { updateStoreSchemaAr } from "../../../lib/validations/ar/storeSchemaAr";
import { updateStore } from "../../../store/slices/productSlice";
import LinkMyStore from "./LinkMyStore";

const StoreInfo = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const [t, i18n] = useTranslation();
  const { language } = i18n;


  const { storeInfo, store_urlImage, success, isLoading, api_errors, is_active_list } = useSelector(
    (state) => state.product
  );

  const defaultValues = storeInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? updateStoreSchema : updateStoreSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess())
  }, [dispatch, router, success]);

  const onSubmit = (data) => {
    typeof data.logo == 'string' && delete data.logo
    dispatch(updateStore(data));
  };

  return (
    <div>
      <form
        className={`mt-2 mb-4`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
          <div className="d-flex justify-content-between">
            <p className="px-4 fs-5">{t("dashboard.store_info")}</p>
            <div className="mx-3"><LinkMyStore id={storeInfo.title} /></div>
          </div>

          <hr />

          <div className="row">

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
              <SafqaInput
                type="text"
                register={register}
                name="title"
                label={t("dashboard.title")}
                error={errors.title?.message || api_errors?.title}
                required
              />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
              <SafqaFileInput
                name="logo"
                register={register}
                label={t("dashboard.logo")}
                error={errors.logo?.message || api_errors?.logo}
              />
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-5">
              {/* <p>{t("dashboard.logo")}</p> */}
              {/* add download and show */}
              {
                storeInfo?.logo ?
                  <p className={`d-flex ${showStyles.data}`}>
                    <span className={language == "en" ? "me-5 mt-1" : "ms-4"}>
                      <BtnDownload url={`${store_urlImage}/${storeInfo?.logo}`} name={storeInfo.title} />
                    </span>
                    <span className={language == "en" ? "me-5" : ""}>
                      <BtnShowImg src={`${store_urlImage}/${storeInfo?.logo}`} />
                    </span>
                  </p> :
                  <p className={showStyles.data}>
                    {language == 'en' ? 'Logo is not available' : 'الشعار غير موجود'}
                  </p>
              }
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-6 col-sm-6 px-4 mt-3">
              <SafqaTextArea
                type="text"
                register={register}
                name="description"
                label={t("dashboard.description")}
                error={errors.description?.message || api_errors?.description}
                required
                rows="4"
              />
            </div>
          </div>

        </div>
        <MagicBtn label={t("dashboard.save")} isLoading={isLoading} />
      </form>
    </div>
  );
};

export default StoreInfo;
