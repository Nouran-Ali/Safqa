// import { i18n } from '../../comps/i18n';
import styles from "../../styles/Dashboard/dashboard.module.css";
import CustomerInfoShow from "../../comps/Dashboard/Invoices/CustomerInfoShow";
import InvoiceInfoShow from "../../comps/Dashboard/Invoices/InvoiceInfoShow";
import InvoiceItemsShow from "../../comps/Dashboard/Invoices/InvoiceItemsShow";
import InvoicesViewsShow from "../../comps/Dashboard/Invoices/InvoicesViewsShow";
import InvoiceTransactionsShow from "../../comps/Dashboard/Invoices/InvoiceTransactionsShow";
import InvoiceDesign from "../../comps/Dashboard/InvoiceDesign";
import PaymentLinkDesign from "../../comps/Dashboard/PaymentLinkDesign";

export default function showInvoices() {
  return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
          <div className={styles.container}>
            {/* Customer Info Show */}
            <CustomerInfoShow />

            {/* Invoice Info Show */}
            <InvoiceInfoShow/>

            {/* Invoice Items Show */}
            <InvoiceItemsShow/>

            {/* Invoices Views */}
            <InvoicesViewsShow/>

            {/* Invoice Transactions */}
            <InvoiceTransactionsShow/>

            {/* <InvoiceDesign/> */}

            {/* <PaymentLinkDesign /> */}
          </div>
        </div>
  );
}
