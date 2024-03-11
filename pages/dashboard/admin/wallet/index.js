import styles from "../../../../styles/Dashboard/dashboard.module.css";
import SearchDeposits from "../../../../comps/Dashboard/Deposits/SearchDeposits";
import Deposits from "../../../../comps/Dashboard/Deposits/Deposits";
import SectionGradient from "../../../../comps/Dashboard/SectionGradient";
import { useTranslation } from "react-i18next";
import AdminDeposits from "../../../../comps/Dashboard/Deposits/AdminDeposits";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminDeposits } from "../../../../store/slices/depositSlice";
import buttonStyles from "../../../../styles/Dashboard/TotalBalanceaAndTransactions.module.css";
import { getAdminHomePage } from "../../../../store/slices/authSlice";
import { formatNumber } from "../../../../lib/validations/services";


export default function AdminDepositsPage() {
  const [t, i18n] = useTranslation();
  const { language } = i18n
  const dispatch = useDispatch()
  const { statistics: { invoices, transaction_count, transaction_value, wallet_safqa } } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAdminDeposits());
  }, [dispatch])

  return (

    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Total Deposits */}
        {/* <SectionGradient text={t("dashboard.total_deposits")}/> */}

        <div className="d-flex justify-content-between text-center" dir={language == "ar" ? "rtl" : "ltr"}>
          <div className={`${buttonStyles.balance} rounded-2`}>
            <h2 className="text-white fw-bold mt-3">
              {formatNumber(wallet_safqa?.total_balance)} $
            </h2>
            <p className="text-white-50">{t("dashboard.total_balance")}</p>
          </div>
          <div className={`${buttonStyles.balance} ${buttonStyles.Transactions} rounded-2`}>
            <h2 className="text-white fw-bold mt-3">
              {formatNumber(wallet_safqa?.awating_transfer)} $
            </h2>
            <p className="text-white-50">{t("dashboard.awaiting_to_transfer")}</p>
          </div>
        </div>
        {/* Search Deposits */}
        {/* <SearchDeposits /> */}

        {/* Deposits */}
        <AdminDeposits />
      </div>
    </div>
  );
}

