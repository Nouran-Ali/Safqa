import styles from "../../../styles/Dashboard/Show.module.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { getFullDateFromISO } from "../../../lib/dates";
import CopyToClipboard from "../CopyToClipboard";
import { useSelector } from "react-redux";

const PaymentLinksShow = ({ payment }) => {
  const { profile_business } = useSelector((state) => state.profileBusiness);
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
          <h5>{t('dashboard.payment_link_info')}</h5>
          <CopyToClipboard
            copyText={`https://safqapay.com/payLink/${payment.id}`}
            title={t('dashboard.payment_link_url')}
          />
        </div>
        <hr />
        {/* <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.invoice_type")}</p>
            <p className={styles.data}>Payment link</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.views")}</p>
            <p className={styles.data}>2</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.vendor")}</p>
            <p className={styles.data}>Ahmed khaled</p>
          </div>
        </div> */}

        <div className="row">
          {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.payment_link_reference")}</p>
            <p className={styles.data}>2022000002</p>
          </div> */}
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t('dashboard.payment_url_title')}</p>
            <p className={styles.data}>{payment.payment_title}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t('dashboard.date')}</p>
            <p className={styles.data}>
              {getFullDateFromISO(payment.created_at)}
            </p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t('dashboard.language_of_the_payment_link')}</p>
            <p className={styles.data}>{t('dashboard.english')}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t('dashboard.fixed_price')}</p>
            <p className={styles.data}>
              {payment.open_amount ? t('dashboard.no') : t('dashboard.yes')}
            </p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t('dashboard.payment_amount')}</p>
            <p className={styles.data}>
              {payment.payment_amount} ({payment?.currency?.short_currency})
            </p>
          </div>
          {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.is_the_payment_link_active")}</p>
            <p className={styles.data}>{payment.is_active ? t('dashboard.yes') : t('dashboard.no')}</p>
          </div> */}
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.commission_type')}</p>
            <p className={`${styles.data}`}>
              {
                commission_types[payment.commission_type][
                  language == 'en' ? 'name_en' : 'name_ar'
                ]
              }
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t('dashboard.comments')}</p>
            <p className={styles.data}>{payment.comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentLinksShow;
