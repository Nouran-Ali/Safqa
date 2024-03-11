import styles from "../../../styles/Dashboard/Create.module.css";
import { MagicBtn } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAddressSchema } from "../../../lib/validations/en/addressSchema";
import { useEffect } from "react";
import { createAddress, ResetSuccess, updateAddress } from "../../../store/slices/addressSlice";
import { useRouter } from "next/router";
import { SafqaInput, SafqaSelect } from "../Inputs";
import { createAddressSchemaAr } from "../../../lib/validations/ar/addressSchemaAr";

const UpdateAddress = ({ address }) => {
  console.log(address)
  const router = useRouter();
  const dispatch = useDispatch();

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { addressTypes } = useSelector((state) => state.addressType);
  const { cities } = useSelector((state) => state.city);
  const { areas } = useSelector((state) => state.area);

  const { isLoading, api_errors, success } = useSelector(
    (state) => state.address
  );

  const defaultValues = address;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createAddressSchema : createAddressSchemaAr),
    defaultValues,
  });

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/setting/addresses")
  }, [dispatch, router, success]);

  const onSubmit = (data) => {
    dispatch(updateAddress(data));
  };


  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.CreateNewAdresse} ${language == "ar" && styles.CreateNewAdresseAR + " me-5"}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
            <SafqaSelect
              select_label
              label={t("dashboard.address_type")}
              register={register}
              name="addressType_id"
              options={addressTypes}
              option_name="name_en"
              option_name_ar="name_ar"
              error={
                errors.addressType_id?.message ||
                api_errors?.addressType_id
              }
              required
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
            <SafqaSelect
              select_label
              label={t("dashboard.city")}
              register={register}
              name="city_id"
              options={cities}
              option_name="name_en"
              option_name_ar="name_ar"
              error={
                errors.city_id?.message ||
                api_errors?.city_id
              }
              required
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
            <SafqaSelect
              select_label
              label={t("dashboard.area")}
              register={register}
              name="area_id"
              options={areas}
              option_name="name_en"
              option_name_ar="name_ar"
              error={
                errors.area_id?.message ||
                api_errors?.area_id
              }
              required
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">

            <SafqaInput
              label={t("dashboard.block")}
              type="text"
              register={register}
              name="block"
              required
              error={
                errors.block?.message ||
                api_errors?.block
              }
            />

          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">

            <SafqaInput
              label={t("dashboard.avenue")}
              type="text"
              register={register}
              name="avenue"
              required
              error={
                errors.avenue?.message ||
                api_errors?.avenue
              }
            />

          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">

            <SafqaInput
              label={t("dashboard.street")}
              type="text"
              register={register}
              name="street"
              required
              error={
                errors.street?.message ||
                api_errors?.street
              }
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">

            <SafqaInput
              label={t("dashboard.House/Bldg_no")}
              type="text"
              register={register}
              name="bldgNo"
              error={
                errors.bldgNo?.message ||
                api_errors?.bldgNo
              }
            />

          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
            <SafqaInput
              label={t("dashboard.appartment")}
              type="text"
              register={register}
              name="appartment"
              error={
                errors.appartment?.message ||
                api_errors?.appartment
              }
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
            <SafqaInput
              label={t("dashboard.floor")}
              type="text"
              register={register}
              name="floor"
              error={
                errors.floor?.message ||
                api_errors?.floor
              }
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
            <SafqaInput
              label={t("dashboard.instructions")}
              type="text"
              register={register}
              name="instructions"
              error={
                errors.instructions?.message ||
                api_errors?.instructions
              }
            />
          </div>
        </div>

        <div className="text-center mt-4 mb-4">
          <MagicBtn isLoading={isLoading} label={t("dashboard.save")} />
        </div>
      </form>
    </>
  );
};

export default UpdateAddress;
