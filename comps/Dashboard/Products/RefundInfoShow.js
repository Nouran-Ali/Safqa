import Link from "next/link";
import styles from "../../../styles/Dashboard/Show.module.css";
import { BtnShow, BtnShowImg } from "../../Buttons";
import { BtnDownload } from "../../Buttons";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { getFullDateFromISO } from "../../../lib/dates";

const RefundInfoShow = ({ refund }) => {
  const {
    invoice,
    customer_name,
    created_at,
    amount,
    amount_from_vendor,
    amount_to_customer,
    status,
    IsDeductRefundChargeFromCustomer,
    IsDeductServiceChargeFromCustomer
  } = refund;

  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5 ms-4"} ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar" ? "rtl" : "ltr"}>
        <h5>{t("dashboard.refund_info")}</h5>
        <hr />
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.customer_name")}</p>
            <p className={styles.data}>{invoice.customer_name}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.amount")}</p>
            <p className={styles.data}>{amount}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.created_on")}</p>
            <p className={styles.data}>{getFullDateFromISO(created_at)}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.refundFromCustomer")}</p>
            <p className={styles.data}>{IsDeductRefundChargeFromCustomer ? t('dashboard.yes') : t('dashboard.no')}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.serviceFromCustomer")}</p>
            <p className={styles.data}>{IsDeductServiceChargeFromCustomer ? t('dashboard.yes') : t('dashboard.no')}</p>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <p>{t("dashboard.status")}</p>
            <p className={styles.data}>{status}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RefundInfoShow;
