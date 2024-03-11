import styles from "../../../../styles/Dashboard/Show.module.css";
import { MagicLinkDisIconInMobile } from "../../../Buttons";
import RefreshIcon from "@mui/icons-material/Refresh";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PrintIcon from '@mui/icons-material/Print';
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

const OrderTransactions = () => {
  const { theme } = useTheme();
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <div className={`mt-2 mb-4`}>
      <div className={`rounded-2 ${language == "ar" && "me-5"}  ${theme == 'dark' ? styles.info_dark : styles.info}`} dir={language == "ar"  ? "rtl" : "ltr"}>
        <h5>{t("dashboard.order_transactions")}</h5>
        <hr />
        <div className="row">
          <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6">
            <p>{t("dashboard.reference_id")}</p>
            <p className={styles.data}>223217110087</p>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6">
            <p>{t("dashboard.transaction_date")}</p>
            <p className={styles.data}>20/08/2022 20:21</p>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6">
            <p>{t("dashboard.transaction_status")}</p>
            <p className={styles.data}>Succss</p>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6">
            <p>{t("dashboard.payment_gateway")}</p>
            <p className={styles.data}>Debit/Credit Cards</p>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6">
            <p>{t("dashboard.payment_id")}</p>
            <p className={styles.data}>07072613912260258972</p>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6">
            <p>{t("dashboard.track_id")}</p>
            <p className={styles.data}>20-08-2022_2602589</p>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6">
            <p>{t("dashboard.transaction_id")}</p>
            <p className={styles.data}></p>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-3 text-white">
          <MagicLinkDisIconInMobile
            url="/dashboard"
            style={styles.bgLactic}
            icon={<RefreshIcon/>}
            name={t("dashboard.resend_receipt")}
          />
          <MagicLinkDisIconInMobile
            url="/dashboard"
            style={styles.bgLactic}
            icon={<LocalMallIcon/>}
            name={t("dashboard.picked")}
          />
          <MagicLinkDisIconInMobile
            url="/dashboard"
            style={styles.bgLactic}
            icon={<PrintIcon/>}
            name={t("dashboard.print")}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderTransactions;
