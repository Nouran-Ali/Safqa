import styles from "../../../styles/Dashboard/BusinessDetails.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import VerticalAlignTopRoundedIcon from "@mui/icons-material/VerticalAlignTopRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../../LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import {
  ResetSuccess,
  getProfilesBusiness,
  updateProfileBusiness,
} from "../../../store/slices/profileBusinessSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  SafqaInput,
  SafqaPhoneInput,
  SafqaSelect,
  SafqaTextArea,
} from "../Inputs";
import { updateProfileBusinessScehma } from "../../../lib/validations/en/profileBusinessScehma";
import { updateProfileBusinessScehmaAr } from "../../../lib/validations/ar/profileBusinessScehmaAr";
import { Button, Dropdown, Image, Menu, Space } from "antd";
import { BtnShowImg } from "../../Buttons";
import VisibilityIcon from "@mui/icons-material/Visibility";

const BusinessDetails = ({ profile_business }) => {
  const { invoice_expiry } = useSelector((state) => state.invoice);
  const { deposit_terms } = useSelector((state) => state.deposit);
  const { active_countries } = useSelector((state) => state.country);
  const { languages } = useSelector((state) => state.language);
  const { isLoading, api_errors, success } = useSelector(
    (state) => state.profileBusiness
  );
  const { business_categories } = useSelector(
    (state) => state.businessCategory
  );
  const { banks } = useSelector((state) => state.bank);
  const [imagePreview, setImagePreview] = useState(null);

  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      language == "en"
        ? updateProfileBusinessScehma
        : updateProfileBusinessScehmaAr
    ),
    defaultValues: profile_business,
  });

  const { logo } = watch();

  useEffect(() => {
    success && reset() && dispatch(ResetSuccess());
  }, [dispatch, reset, success]);

  useEffect(() => {
    if (success) {
      reset();
      dispatch(ResetSuccess());
      dispatch(getProfilesBusiness());
    }
  }, [dispatch, reset, success]);

  // useEffect(() => {
  //   if (profile_business) {
  //     profile_business.custom_sms_ar && setValue('custom_sms_ar', profile_business.custom_sms_ar)
  //     profile_business.custom_sms_en && setValue('custom_sms_en', profile_business.custom_sms_en)
  //     profile_business.terms_and_conditions && setValue('terms_and_conditions', profile_business.terms_and_conditions)
  //     profile_business.website_url && setValue('website_url', profile_business.website_url)
  //     setValue('company_name', profile_business.company_name)
  //     setValue('phone_number_code_id', profile_business.phone_number_code_id)
  //     setValue('phone_number', profile_business.phone_number)
  //     setValue('category_id', profile_business.category_id)
  //     setValue('invoice_expiry_after_type_id', profile_business.invoice_expiry_after_type_id)
  //     setValue('invoice_expiry_after_number', profile_business.invoice_expiry_after_number)
  //     setValue('promo_code', profile_business.promo_code)
  //     setValue('work_email', profile_business.work_email)
  //     setValue('currency_id', profile_business?.country?.id)
  //     setValue('country_id', profile_business?.country?.id)
  //     setValue('bank_name', profile_business?.bank?.name)
  //     // setValue('language_id', profile_business.language_id)
  //     // setValue('products_delivery_fees', profile_business.products_delivery_fees)
  //     // setValue('deposit_terms_id', profile_business.deposit_terms_id)
  //   }
  // }, [profile_business, setValue]);

  const ShowImgButton = () => {
    const [visible, setVisible] = useState(false);

    return (
      <button
        onClick={() => setVisible(true)}
        className={`dropdown-item ${
          theme == "dark" ? "text-grey" : "text-dark"
        }`}
      >
        <VisibilityIcon />
        <span className="ms-3 text-wrap">{t("dashboard.show_img")}</span>
        <Image
          // width={200}
          style={{
            display: "none",
          }}
          // src={
          //   profile_business?.logo ?
          //     profile_business.logo :
          //     theme == "dark" ?
          //       "/dark-logo.png" :
          //       "/logo.png"
          // }
          preview={{
            visible,
            scaleStep: 1,
            src: profile_business?.logo
              ? profile_business.logo
              : theme == "dark"
              ? "/dark-logo.png"
              : "/logo.png",
            onVisibleChange: (value) => {
              setVisible(value);
            },
          }}
        />
      </button>
    );
  };

  const MenuItems = (
    <Menu>
      <Menu.Item>
        <label
          className={`dropdown-item ${
            theme == "dark" ? "text-grey" : "text-dark"
          }`}
          htmlFor="logo"
        >
          <VerticalAlignTopRoundedIcon />
          <span className="ms-3 text-wrap">
            {logo?.[0]?.name || t("dashboard.change_picture")}
          </span>
        </label>
        <input hidden type="file" id="logo" {...register("logo")} />
      </Menu.Item>
      <Menu.Item>
        <ShowImgButton />
      </Menu.Item>

      {/* <Menu.Item>
        <a className={`dropdown-item ${theme == 'dark' ? " text-grey" : "text-dark"}`} href="#">
          <DeleteIcon />
          <span className="ms-3">{t("dashboard.remove_picture")}</span>
        </a>
      </Menu.Item> */}
    </Menu>
  );

  useEffect(() => {
    if (logo instanceof FileList && logo?.length) {
      const selectedFile = logo?.[0];
      const url = URL.createObjectURL(selectedFile);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  }, [logo]);

  const onSubmit = (data) => {
    dispatch(updateProfileBusiness(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`${styles.BusinessDetails} ${language == "ar" && "me-4"}`}
        dir={language == "ar" ? "rtl" : "ltr"}
      >
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 ">
            <div className="mb-3">
              <label className="mb-2">{t("dashboard.logo")}</label>
              <div className="position-relative mb-4">
                <div className="mx-auto text-center">
                  <img
                    src={
                      imagePreview
                        ? imagePreview
                        : profile_business?.logo
                        ? profile_business.logo
                        : theme == "dark"
                        ? "/dark-logo.png"
                        : "/logo.png"
                    }
                    height="183px"
                    className="mx-auto p-2 mb-2"
                  />
                </div>
                {errors.logo && (
                  <span className="text-danger fs-6">
                    {errors.logo.message}
                  </span>
                )}
                {api_errors?.logo && (
                  <span className="text-danger fs-6">{api_errors.logo}</span>
                )}

                {/* start change profile logo  */}

                <Dropdown overlay={MenuItems} placement="bottom">
                  <button
                    type="button"
                    className={`border-0 rounded-2 shadow-none text-white p-2 bg-opacity-50 position-absolute ${styles.btnImg}`}
                  >
                    <PhotoCameraRoundedIcon
                      sx={{ width: "25px", height: "15px" }}
                    />
                  </button>
                </Dropdown>

                {/* <div
                className={`border-0 rounded-2 shadow-none position-absolute end-0 `}
              >
                <BtnShowImg
                  src={
                    profile_business?.logo ?
                      profile_business.logo :
                      theme == "dark" ?
                        "/dark-logo.png" :
                        "/logo.png"
                  }
                />
              </div> */}

                {/* end change profile logo  */}
              </div>
            </div>

            {/* approval_status */}
            <div className="mb-3 d-sm-none-o">
              <label className="mb-2">{t("dashboard.approval_status")}</label>

              <div className={`input-group rounded-2`}>
                <input
                  {...register("is_approval")}
                  className={`form-control shadow-none border-0`}
                  type="text"
                  // placeholder={profile_business?.approval_status ? t('dashboard.yes') : t('dashboard.no')}
                  aria-describedby="addon-wrapping3"
                  disabled
                  value={
                    profile_business?.is_approval
                      ? t("dashboard.yes")
                      : t("dashboard.no")
                  }
                />
                <div
                  className={`input-group-text ${styles.icon}`}
                  id="addon-wrapping3"
                >
                  {profile_business?.is_approval ? (
                    <CheckCircleIcon className="safqa-text-success" />
                  ) : (
                    <CancelIcon className="safqa-text-danger" />
                  )}
                </div>
              </div>
            </div>

            {/* terms_and_conditions */}
            <div className="mb-3 d-sm-none-o">
              <SafqaTextArea
                label={t("dashboard.terms_and_conditions")}
                name="terms_and_conditions"
                register={register}
                error={
                  errors.terms_and_conditions?.message ||
                  api_errors?.terms_and_conditions
                }
                rows="8"
              />
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            {/* company_name */}
            <div className="mb-3">
              <SafqaInput
                label={t("dashboard.company_name")}
                name="company_name"
                type="text"
                register={register}
                error={errors.company_name?.message || api_errors?.company_name}
                required
                // disabled
              />
            </div>

            {/* work_email */}
            <div className="mb-3 ">
              <SafqaInput
                label={t("dashboard.work_email")}
                name="work_email"
                type="text"
                register={register}
                error={errors.work_email?.message || api_errors?.work_email}
                required
              />
            </div>

            {/* invoice_expiry_type */}
            <div className="mb-3">
              <SafqaSelect
                select_label
                label={t("dashboard.invoice_expiry_type")}
                options={invoice_expiry}
                option_name="name_en"
                option_name_ar="name_ar"
                name="invoice_expiry_after_type_id"
                register={register}
                required
                error={
                  errors.invoice_expiry_after_type_id?.message ||
                  api_errors?.invoice_expiry_after_type_id
                }
              />
            </div>

            {/* invoice_expiry_after */}
            <div className="mb-3">
              <SafqaInput
                label={t("dashboard.invoice_expiry_after")}
                name="invoice_expiry_after_number"
                type="number"
                register={register}
                error={
                  errors.invoice_expiry_after_number?.message ||
                  api_errors?.invoice_expiry_after_number
                }
                required
              />
            </div>

            {/* deposit_terms */}
            {/* <div className="mb-3">
              <SafqaSelect
                select_label
                label={t("dashboard.deposit_terms")}
                options={deposit_terms}
                option_name="name_en"
                option_name_ar="name_ar"
                name="deposit_terms_id"
                register={register}
                required
                error={errors.deposit_terms_id?.message || api_errors?.deposit_terms_id}
              />
            </div> */}

            <div className="mb-3">
              <SafqaSelect
                disabled
                select_label
                label={t("dashboard.country")}
                options={active_countries}
                option_name="name_en"
                option_name_ar="name_ar"
                name="country_id"
                register={register}
                required
                undisplay_icon
                error={errors.country_id?.message || api_errors?.country_id}
              />
            </div>

            {/* custom_SMS_EN */}
            <div className="mb-3">
              <SafqaTextArea
                rows="5"
                label={t("dashboard.custom_SMS_EN")}
                name="custom_sms_en"
                register={register}
                error={
                  errors.custom_sms_en?.message || api_errors?.custom_sms_en
                }
              />
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            {/* category */}
            <div className="mb-3">
              <SafqaSelect
                // disabled
                select_label
                label={t("dashboard.category")}
                options={business_categories}
                option_name="name_en"
                option_name_ar="name_ar"
                name="category_id"
                register={register}
                required
                error={errors.category_id?.message || api_errors?.category_id}
              />
            </div>

            {/* website_URL */}
            <div className="mb-3">
              <SafqaInput
                label={t("dashboard.website_URL")}
                name="website_url"
                type="text"
                register={register}
                error={errors.website_url?.message || api_errors?.website_url}
                // required
              />
            </div>

            {/* work_phone */}
            <div className="mb-3">
              <SafqaPhoneInput
                label={t("dashboard.work_phone")}
                placeholder="1010932484"
                required
                default_flag_id={profile_business?.phone_number_code_id}
                phone_name="phone_number"
                code_name="phone_number_code_id"
                register={register}
                error={errors.phone_number?.message || api_errors?.phone_number}
                codeError={
                  errors.phone_number_code_id?.message ||
                  api_errors?.phone_number_code_id
                }
              />
            </div>

            {/* promo_code */}
            {/* <div className="mb-3">
              <SafqaInput
                label={t("dashboard.promo_code")}
                name="promo_code"
                type="text"
                register={register}
                error={errors.promo_code?.message || api_errors?.promo_code}
                required
              // disabled
              />
            </div> */}

            <div className="mb-3">
              {/* <SafqaInput
                label={t("dashboard.bank_name")}
                name="bank_name"
                type="text"
                register={register}
                error={errors.bank_name?.message || api_errors?.bank_name}
                required
                disabled
              /> */}
              <SafqaSelect
                select_label
                label={t("dashboard.bank_name")}
                options={banks}
                option_name="name_en"
                option_name_ar="name_ar"
                required
                name="bank_id"
                register={register}
                error={errors.bank_id?.message || api_errors?.bank_id}
                disabled
                undisplay_icon
              />
            </div>

            {/* currency */}
            <div className="mb-3">
              <SafqaSelect
                select_label
                label={t("dashboard.currency")}
                options={active_countries}
                option_name="currency"
                option_name_ar="currency"
                required
                name="country_id"
                register={register}
                error={errors.country_id?.message || api_errors?.country_id}
                disabled
                undisplay_icon
              />
            </div>

            {/* products_delivery_fees */}
            {/* <div className="mb-3">
              <SafqaInput
                label={t("dashboard.products_delivery_fees")}
                name="products_delivery_fees"
                type="text"
                register={register}
                error={errors.products_delivery_fees?.message || api_errors?.products_delivery_fees}
                required
              />
            </div> */}

            {/* custom_SMS_AR */}
            <div className="mb-3">
              <SafqaTextArea
                rows="5"
                label={t("dashboard.custom_SMS_AR")}
                name="custom_sms_ar"
                register={register}
                error={
                  errors.custom_sms_ar?.message || api_errors?.custom_sms_ar
                }
              />
            </div>
            <div className="mb-3 d-sm-none">
              <label className="mb-2">{t("dashboard.approval_status")}</label>

              <div className={`input-group rounded-2`}>
                <input
                  {...register("is_approval")}
                  className={`form-control shadow-none border-0`}
                  type="text"
                  // placeholder={profile_business?.approval_status ? t('dashboard.yes') : t('dashboard.no')}
                  aria-describedby="addon-wrapping3"
                  disabled
                  value={
                    profile_business?.is_approval
                      ? t("dashboard.yes")
                      : t("dashboard.no")
                  }
                />
                <div
                  className={`input-group-text ${styles.icon}`}
                  id="addon-wrapping3"
                >
                  {profile_business?.is_approval ? (
                    <CheckCircleIcon className="safqa-text-success" />
                  ) : (
                    <CancelIcon className="safqa-text-danger" />
                  )}
                </div>
              </div>
            </div>

            {/* terms_and_conditions */}
            <div className="mb-3 d-sm-none">
              <SafqaTextArea
                label={t("dashboard.terms_and_conditions")}
                name="terms_and_conditions"
                register={register}
                error={
                  errors.terms_and_conditions?.message ||
                  api_errors?.terms_and_conditions
                }
                rows="8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="text-center mt-5 mb-4">
        <button type="submit" className={`border-0 rounded-2 ${styles.save}`}>
          {isLoading ? <LoadingSpinner /> : t("dashboard.save")}
        </button>
      </div>
    </form>
  );
};

export default BusinessDetails;
