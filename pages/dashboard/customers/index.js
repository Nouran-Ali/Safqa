// import Image from "next/image";
// import Link from "next/link";
// import { i18n } from '../../comps/i18n';
import styles from "../../../styles/Dashboard/dashboard.module.css";
import SearchCustomers from "../../../comps/Dashboard/Customers/SearchCustomers";
import Customers from "../../../comps/Dashboard/Customers/Customers";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCustomers } from "../../../store/slices/customerSlice";

export default function CustomersPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch])

  return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
          <div className={styles.container}>
            {/* Search customers */}
            <SearchCustomers />

            {/* customers */}
            <Customers />
          </div>
        </div>
  );
}
