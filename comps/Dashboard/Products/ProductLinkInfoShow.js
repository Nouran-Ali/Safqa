import Link from "next/link";
import styles from "../../../styles/Dashboard/Show.module.css";
import { BtnShow, BtnShowImg } from "../../Buttons";
import { BtnDownload } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../LoadingSpinner";
import { Space, Tag } from "antd";
import CopyToClipboard from "../CopyToClipboard";


const ProductLinkInfoShow = ({ product_link }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
    const { commission_types } = useSelector((state) => state.invoice);

  return (
    <div className={`mt-2 mb-4`}>
      <div
        className={`rounded-2 ${language == 'ar' && 'me-5 ms-4'} ${
          theme == 'dark' ? styles.info_dark : styles.info
        }`}
        dir={language == 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="d-flex justify-content-between">
          <h5>{t('dashboard.product_link_info')}</h5>
          <CopyToClipboard
            copyText={`https://safqapay.com/payProduct/${product_link.id}`}
            title={t('dashboard.product_url')}
          />
        </div>
        <hr />

        <>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
              <p>{t('dashboard.name_En')}</p>
              <p className={styles.data}>{product_link?.name_en}</p>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
              <p>{t('dashboard.name_Ar')}</p>
              <p className={styles.data}>{product_link?.name_ar}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
              <p>{t('dashboard.is_active')}</p>
              <p className={styles.data}>
                {product_link?.is_active
                  ? t('dashboard.yes')
                  : t('dashboard.no')}
              </p>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
              <p>{t('dashboard.commission_type')}</p>
              <p className={`${styles.data}`}>
                {
                  commission_types[product_link.commission_type][
                    language == 'en' ? 'name_en' : 'name_ar'
                  ]
                }
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <p>{t('dashboard.terms_conditions')}</p>
              <p className={styles.data}>
                {product_link?.Terms_and_conditions}
              </p>
            </div>
          </div>

          <div className="row">
            <p>{t('dashboard.products')}</p>
            <Space size={[0, 6]} wrap>
              {product_link?.products.map((product) => (
                <Tag key={product.id} className="fs-6 rounded">
                  {language == 'en' ? product.name_en : product.name_ar}
                </Tag>
              ))}
            </Space>
          </div>
        </>
      </div>
    </div>
  );
};

export default ProductLinkInfoShow;
