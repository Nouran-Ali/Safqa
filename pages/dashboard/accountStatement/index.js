// import Image from "next/image";
// import Link from "next/link";
// import { i18n } from '../../comps/i18n';
import styles from "../../../styles/Dashboard/dashboard.module.css";
// import AccountStatementSearch from "../../../comps/Dashboard/AccountStatement/AccountStatementSearch";
import Accounts from "../../../comps/Dashboard/AccountStatement/Accounts";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAccountStatments } from "../../../store/slices/accountStatmentSlice";

export default function AccountStatement() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccountStatments());
  }, [dispatch]);

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Account Statement Search */}
        {/* <AccountStatementSearch /> */}

        {/* Accounts */}
        <Accounts />
      </div>
    </div>
  );
}
