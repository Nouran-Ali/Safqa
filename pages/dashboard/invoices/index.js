// import Image from "next/image";
// import Link from "next/link";
// import { i18n } from '../../comps/i18n';
import styles from "../../../styles/Dashboard/dashboard.module.css";
import NavInvoices from "../../../comps/Dashboard/Invoices/NavInvoices";
import SearchInvoices from "../../../comps/Dashboard/Invoices/SearchInvoices";
import Invoices from "../../../comps/Dashboard/Invoices/Invoices";
import { useDispatch } from "react-redux";
import { getInvoices } from "../../../store/slices/invoiceSlice";
import { useEffect } from "react";
import { getProfilesBusiness } from "../../../store/slices/profileBusinessSlice";

export default function InvoicesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvoices());
    // dispatch(getProfilesBusiness());
  }, [dispatch]);

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Nav invoices buttons */}
        <NavInvoices />

        {/* Invoices */}
        <Invoices />
      </div>
    </div>
  );
}
