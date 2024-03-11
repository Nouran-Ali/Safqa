import styles from "../../../styles/Dashboard/dashboard.module.css";
import SearchDeposits from "../../../comps/Dashboard/Deposits/SearchDeposits";
import Deposits from "../../../comps/Dashboard/Deposits/Deposits";
import SectionGradient from "../../../comps/Dashboard/SectionGradient";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDeposits } from "../../../store/slices/depositSlice";

export default function DepositsPage() {
  const [t, i18n] = useTranslation();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDeposits());
  }, [dispatch])

  return (
    
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
          <div className={styles.container}>
            {/* Total Deposits */}
            <SectionGradient text={`${t("dashboard.total_deposits")} 00.00`}/>

            {/* Search Deposits */}
            {/* <SearchDeposits /> */}

            {/* Deposits */}
            <Deposits />
          </div>
        </div>
  );
}

