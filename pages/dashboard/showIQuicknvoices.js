// import Image from "next/image";
// import Link from "next/link";
// import { i18n } from '../../comps/i18n';
import styles from "../../styles/Dashboard/dashboard.module.css";
import CustomerInfoShow from "../../comps/Dashboard/Invoices/CustomerInfoShow";
import InvoiceInfoShow from "../../comps/Dashboard/Invoices/InvoiceInfoShow";
import InvoicesViewsShow from "../../comps/Dashboard/Invoices/InvoicesViewsShow";
import InvoiceTransactionsShow from "../../comps/Dashboard/Invoices/InvoiceTransactionsShow";

export default function showIQuicknvoices() {
  return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
          <div className={styles.container}>
            {/* Customer Info Show */}
            <CustomerInfoShow />

            {/* Invoice Info Show */}
            <InvoiceInfoShow/>

            {/* Invoices Views */}
            <InvoicesViewsShow/>

            {/* Invoice Transactions */}
            <InvoiceTransactionsShow/>
          </div>
        </div>
  );
}