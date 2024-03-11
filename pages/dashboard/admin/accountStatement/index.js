import styles from "../../../../styles/Dashboard/dashboard.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllAccountStatments } from "../../../../store/slices/accountStatmentSlice";
import AllAccounts from "../../../../comps/Dashboard/AccountStatement/AllAccounts";

export default function AccountStatement() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllAccountStatments())
  }, [dispatch])
  
  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Account Statement Search */}
        {/* <AccountStatementSearch /> */}

        {/* Accounts */}
        <AllAccounts />
      </div>
    </div>
  );
}

