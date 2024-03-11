import Link from 'next/link';
import styles from '../../../styles/Dashboard/Show.module.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { BtnDownload, BtnShowImg } from '../../Buttons';
import CopyToClipboard from '../CopyToClipboard';
import { getFullDateFromISO } from '../../../lib/dates';
import { formatNumber } from '../../../lib/validations/services';
import { useSelector } from 'react-redux';

const InvoiceInfoShow = ({ invoice }) => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;
  const { profile_business } = useSelector((state) => state.profileBusiness);
  const { commission_types } = useSelector((state) => state.invoice);

  const {
    id,
    created_at,
    invoice_item,
    view,
    vendor,
    status,
    transcation,
    is_open_invoice,
    currency,
    invoice_value,
    date_created,
    last_sent_date,
    expiry_date,
    remind_after,
    invoiceUrl,
    discount_type,
    discount_value,
    invoice_display_value,
    attach_file,
    comments,
    recurring_interval,
    terms_and_conditions,
    min_invoice,
    max_invoice,
    refund_amount,
    amount_changable,
    commission_type,
  } = invoice;

  return (
    <div className={`mt-2 mb-4`}>
      <div
        className={`rounded-2 ${language == 'ar' && 'me-5 ms-4'} ${
          theme == 'dark' ? styles.info_dark : styles.info
        }`}
        dir={language == 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="d-flex justify-content-between">
          <h5>{t('dashboard.invoice_info')}</h5>
          <CopyToClipboard
            copyText={`https://safqapay.com/payInvoice/${id}`}
            title={t('dashboard.invoice_url')}
          />
        </div>
        <hr />
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.invoice_type')}</p>
            <p className={styles.data}>
              {invoice_item.length
                ? t('dashboard.invoice')
                : t('dashboard.quick_invoice')}
            </p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.views')}</p>
            <p className={styles.data}>{view?.length}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.vendor')}</p>
            <p className={styles.data}>{vendor.full_name}</p>
          </div>
        </div>

        <div className="row">
          {/* <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.invoice_id")}</p>
            <p className={styles.data}>{id}</p>
          </div> */}
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.commission_type')}</p>
            <p className={`${styles.data}`}>
              {
                commission_types[commission_type][
                  language == 'en' ? 'name_en' : 'name_ar'
                ]
              }
            </p>
          </div>
            {/* <p className={styles.data}> */}
            {/* <Link
                href={`/payInvoice/${id}`}
                className="text-decoration-underline text-break"
              >
                 {`https://safqapay.com/payInvoice/${id}`}
              </Link> */}
            {/* </p> */}
            {/* <CopyToClipboard
              copyText={`https://safqapay.com/payInvoice/${id}`}
              title={t('dashboard.invoice_url')}
            /> */}
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.status')}</p>
            <p
              className={`${status == 'pending' && 'text-warning'}
                ${status == 'paid' && 'text-success'}
                ${status == 'unpaid' && 'text-danger'} text-uppercase
                ${styles.data}
              `}
            >
              {status}
            </p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.attach_file')}</p>
            {attach_file ? (
              <p className={` d-flex align-items-center ${styles.data}`}>
                <span className={language == 'en' ? 'me-5' : 'ms-4'}>
                  <BtnDownload url={attach_file} name={`safqa_invoice ${id}`} />
                </span>
                <span className={language == 'en' ? 'me-2' : ''}>
                  <BtnShowImg src={attach_file} />
                </span>
              </p>
            ) : (
              <p className={styles.data}>
                {language == 'en' ? 'not available' : 'غير موجودة'}
              </p>
            )}
          </div>
          {/* <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.payment_method")}</p>
            <p className={`${styles.data} text-uppercase`}>{transcation ? transcation.typeCard : "-"}</p>
          </div> */}
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>
              {t('dashboard.Is_open_amount')}
              {is_open_invoice ? ` / ${t('dashboard.paid_amount')}` : null}
            </p>
            <p className={styles.data}>
              {is_open_invoice ? (
                <>
                  {min_invoice} - {max_invoice} (
                  {profile_business?.country?.short_currency}) /{' '}
                  {amount_changable} (
                  {profile_business?.country?.short_currency})
                  {/* <CheckCircleOutlined className="text-success fs-5" /> : */}
                </>
              ) : (
                <>
                  <CloseCircleOutlined className="text-danger fs-5" />
                </>
              )}
            </p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.invoice_display_value')}</p>
            <p className={styles.data}>
              {formatNumber(invoice_display_value)} ({currency.short_currency})
            </p>
          </div>
          {/* <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t("dashboard.currency")}</p>
            <p className={styles.data}>{currency.currency} ( {currency.short_currency} )</p>
          </div> */}
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.invoice_value')}</p>
            <p className={styles.data}>
              {formatNumber(invoice_value)} (
              {profile_business?.country?.short_currency})
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.date_created')}</p>
            <p className={styles.data}>{getFullDateFromISO(created_at)}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.expiry_date')}</p>
            <p className={styles.data}>{expiry_date}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.last_sent_date')}</p>
            <p className={styles.data}>{last_sent_date}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.remind_after')}</p>
            <p className={styles.data}>{remind_after} Days</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.discount_available')}</p>
            <p className={styles.data}>
              {discount_value ? (
                <>
                  {discount_value}
                  {discount_type ? '%' : ` ${currency.short_currency}`}
                </>
              ) : (
                <CloseCircleOutlined className="text-danger fs-5" />
              )}
            </p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.recurring_interval')}</p>
            <p className={styles.data}>
              {language == 'en'
                ? recurring_interval?.name_en
                : recurring_interval?.name_ar}
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.refunded_amount')}</p>
            <p className={styles.data}>
              {refund_amount} ({profile_business?.country?.short_currency})
            </p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.terms_conditions')}</p>
            <p className={styles.data}>{terms_and_conditions}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-3 col-sm-3">
            <p>{t('dashboard.comments')}</p>
            <p className={styles.data}>{comments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceInfoShow;
