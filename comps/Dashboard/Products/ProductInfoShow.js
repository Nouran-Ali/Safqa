import Link from "next/link";
import styles from "../../../styles/Dashboard/Show.module.css";
import { BtnShow, BtnShowImg } from "../../Buttons";
import { BtnDownload } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

const ProductInfoShow = ({ product }) => {
  const {
    id,
    name_en,
    name_ar,
    weight,
    height,
    width,
    length,
    product_image,
    description_en,
    description_ar,
    quantity,
    price,
    is_stockable,
    in_store,
    disable_product_on_sold,
    is_active,
    is_shipping_product,
    manager_user_id,
    profile_business_id,
    category_id,
    currency,
    country,
    created_at,
    updated_at,
    category,
  } = product;

  const { urlImage } = useSelector(state => state.product)

  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <h5>{t("dashboard.product_info")}</h5>
        <hr />
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.product_name_En")}</p>
            <p className={styles.data}>{name_en}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.product_name_Ar")}</p>
            <p className={styles.data}>{name_ar}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.remaining_quantity")}</p>
            <p className={styles.data}>{quantity}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.unit_price")}</p>
            <p className={styles.data}>{price}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.product_category")}</p>
            <p className={styles.data}>{category.name_en}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.product_image")}</p>
            {/* add download and show */}
            {
              product_image ?
                <p className={`m-0 d-flex align-items-center ${styles.data}`}>
                  <span className={language == "en" ? "me-5" : "ms-4"}>
                    <BtnDownload url={`${urlImage}/${product_image}`} name={name_en} />
                  </span>
                  <span className={language == "en" ? "me-2" : ""}>
                    <BtnShowImg src={`${urlImage}/${product_image}`} />
                  </span>
                </p> :
                <p className={styles.data}>
                  {language == 'en' ? 'not available' : 'غير موجودة'}
                </p>
            }
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.currency")}</p>
            <p className={styles.data}>{currency?.currency} ({currency.short_currency})</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.is_stockable")}</p>
            <p className={styles.data}>{is_stockable ? t("dashboard.yes") : t("dashboard.no")}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.disable_product_on_sold_out")}</p>
            <p className={styles.data}>{disable_product_on_sold ? t("dashboard.yes") : t("dashboard.no")}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.is_active")}</p>
            <p className={styles.data}>{is_active ? t("dashboard.yes") : t("dashboard.no")}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.is_it_shippable")}</p>
            <p className={styles.data}>{is_shipping_product ? t("dashboard.yes") : t("dashboard.no")}</p>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.add_this_product_in_the_store")}</p>
            <p className={styles.data}>{in_store ? t("dashboard.yes") : t("dashboard.no")}</p>
          </div>
          <div className="col"></div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.description_En")}</p>
            <p className={styles.data}>{description_en}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.description_Ar")}</p>
            <p className={styles.data}>{description_ar}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.width")}</p>
            <p className={styles.data}>{width}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.height")}</p>
            <p className={styles.data}>{height}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.weight")}</p>
            <p className={styles.data}>{weight}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.length")}</p>
            <p className={styles.data}>{length}</p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ProductInfoShow;
