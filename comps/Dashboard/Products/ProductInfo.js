import styles from "../../../styles/Dashboard/Create.module.css";
import Link from "next/link";
import {
  MagicInput,
  MagicTextArea,
  MagicRadioInput,
  MagicSelectInput,
  MagicFileInput,
  SafqaSelect,
  SafqaInput,
  SafqaTextArea,
  SafqaFileInput,
  SafqaRadioInput,
} from "../Inputs";
import { MagicBtn } from "../../Buttons";
import {
  createProduct,
  ResetSuccess,
} from "../../../store/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProductSchema } from "../../../lib/validations/en/productSchema";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { createProductSchemaAr } from "../../../lib/validations/ar/productSchemaAr";

const ProductInfo = () => {
  const { theme } = useTheme();
  const router = useRouter()
  const dispatch = useDispatch();

  const [t, i18n] = useTranslation();
  const { language } = i18n;

  const { active_categories } = useSelector((state) => state.category);
  const { profile_business } = useSelector((state) => state.profileBusiness);
  const { countries } = useSelector((state) => state.country);
  const { productInfo, isLoading, api_errors, success } = useSelector(
    (state) => state.product
  );

  const defaultValues = productInfo;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(language == 'en' ? createProductSchema : createProductSchemaAr),
    defaultValues,
  });

  const watchAllFields = watch();
  const { is_shipping_product } = watchAllFields;

  useEffect(() => {
    setValue('currency_id', profile_business.country.id)
  }, [profile_business.country.id, setValue]);

  useEffect(() => {
    success && dispatch(ResetSuccess()) && router.push("/dashboard/products")
  }, [dispatch, router, success]);

  const onSubmit = (data) => {
    // reset()
    dispatch(createProduct(data));
  };


  return (
    <form className={`mt-2 mb-4`} onSubmit={handleSubmit(onSubmit)}>
      <div className={`rounded-2 ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <p className="px-4 fs-5">{t("dashboard.product_info")}</p>
        <hr />

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              label={t("dashboard.product_name_En")}
              name="name_en"
              type="text"
              register={register}
              error={errors.name_en?.message || api_errors?.name_en}
              required
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              type="text"
              name="name_ar"
              register={register}
              label={t("dashboard.product_name_Ar")}
              required
              error={errors.name_ar?.message || api_errors?.name_ar}
            />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              name="quantity"
              register={register}
              type="number"
              label={t("dashboard.quantity")}
              required
              error={errors.quantity?.message || api_errors?.quantity}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaInput
              name="price"
              register={register}
              type="number"
              label={t("dashboard.unit_price")}
              required
              error={errors.price?.message || api_errors?.price}
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaSelect
              select_label
              option_name="currency"
              option_name_ar="currency"
              label={t("dashboard.currency")}
              name="currency_id"
              register={register}
              options={countries}
              error={
                errors.currency_id?.message || api_errors?.currency_id
              }
              required
              disabled
            />
          </div>
        </div>

        <div className="row">
          {/* product image */}
          <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 px-4 mt-3">
            <SafqaFileInput
              name="product_image"
              register={register}
              label={t("dashboard.product_image")}
              error={errors.product_image?.message || api_errors?.product_image}
              required
            />
          </div>

          {/* product category */}
          <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 px-4 mt-3">
            <div className="d-flex align-items-center">
              <SafqaSelect
                select_label
                option_name="name_en"
                option_name_ar="name_ar"
                label={t("dashboard.product_category")}
                name="category_id"
                register={register}
                options={active_categories}
                error={
                  errors.category_id?.message || api_errors?.category_id
                }
                required
              />

              <Link
                href="/dashboard/products/category/create"
                className={`btn ${language == "en" ? "ms-3" : "me-3"} ${errors.category_id?.message || api_errors?.category_id ? "mt-0" : "mt-4"} w-75  ${styles.btn}`}>

                {t("dashboard.create_product_category")}

              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col px-4 mt-3">
            <SafqaTextArea
              name="description_en"
              register={register}
              label={t("dashboard.description_En")}
              error={
                errors.description_en?.message || api_errors?.description_en
              }
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col px-4 mt-3">
            <SafqaTextArea
              name="description_ar"
              register={register}
              label={t("dashboard.description_Ar")}
              error={
                errors.description_ar?.message || api_errors?.description_ar
              }
              required
            />
          </div>
        </div>

        <div className="row px-4 mt-3">
          <SafqaRadioInput
            label={t("dashboard.is_stockable")}
            items={[
              { id: 1, name: t("dashboard.yes") },
              { id: 0, name: t("dashboard.no") },
            ]}
            name="is_stockable"
            register={register}
            defaultValue={defaultValues.is_stockable}
            error={errors?.is_stockable}
          />
        </div>

        <div className="row px-4 mt-3">
          <SafqaRadioInput
            label={t("dashboard.disable_product_on_sold_out")}
            items={[
              { id: 1, name: t("dashboard.yes") },
              { id: 0, name: t("dashboard.no") },
            ]}
            name="disable_product_on_sold"
            register={register}
            defaultValue={defaultValues.disable_product_on_sold}
            error={errors?.disable_product_on_sold}
          />
        </div>

        <div className="row px-4 mt-3">
          <SafqaRadioInput
            label={t("dashboard.is_active")}
            items={[
              { id: 1, name: t("dashboard.yes") },
              { id: 0, name: t("dashboard.no") },
            ]}
            name="is_active"
            register={register}
            defaultValue={defaultValues.is_active}
            error={errors?.is_active}
          />
        </div>

        <div className="row px-4 mt-3">
          <SafqaRadioInput
            label={t("dashboard.addToStore")}
            items={[
              { id: 1, name: t("dashboard.yes") },
              { id: 0, name: t("dashboard.no") },
            ]}
            name="in_store"
            register={register}
            defaultValue={defaultValues.in_store}
            error={errors?.in_store}
          />
        </div>

        <div className="row px-4 mt-3">
          <SafqaRadioInput
            label={t("dashboard.is_it_shippable")}
            items={[
              { id: 1, name: t("dashboard.yes") },
              { id: 0, name: t("dashboard.no") },
            ]}
            name="is_shipping_product"
            register={register}
            defaultValue={defaultValues.is_shipping_product}
            error={errors?.is_shipping_product}
          />
        </div>

        {is_shipping_product > 0 && (
          <>
            <div className="row px-4 mt-3">
              <div className="col-4 px-4 ">
                <SafqaInput
                  type="number"
                  label={t("dashboard.width")}
                  name="width"
                  register={register}
                  required
                  error={errors.width?.message || api_errors?.width}
                />

              </div>
              <div className="col-4 px-4 ">
                <SafqaInput
                  type="number"
                  label={t("dashboard.height")}
                  name="height"
                  register={register}
                  required
                  error={errors.height?.message || api_errors?.height}
                />

              </div>
            </div>
            <div className="row px-4 mt-3">
              <div className="col-4 px-4 ">
                <SafqaInput
                  type="number"
                  label={t("dashboard.weight")}
                  name="weight"
                  register={register}
                  required
                  error={errors.weight?.message || api_errors?.weight}
                />

              </div>
              <div className="col-4 px-4 ">
                <SafqaInput
                  type="number"
                  label={t("dashboard.length")}
                  name="length"
                  register={register}
                  required
                  error={errors.length?.message || api_errors?.length}
                />

              </div>
            </div>
          </>
        )}

      </div>

      <MagicBtn label={t("dashboard.create")} isLoading={isLoading} />
    </form>
  );
};

export default ProductInfo;
