import styles from "../../styles/Dashboard/dashboard.module.css";
import PaymentLinksShow from "../../comps/Dashboard/Invoices/PaymentLinksShow";
import InvoicesViewsShow from "../../comps/Dashboard/Invoices/InvoicesViewsShow";
import PaymentLinkCustomerInfoShow from "../../comps/Dashboard/Invoices/PaymentLinkCustomerInfoShow";

export default function showPaymentLinks() {
  return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
          <div className={styles.container}>
            {/* Payment Links Info Show */}
            <PaymentLinksShow />

            {/* Invoices Views */}
            <InvoicesViewsShow/>

            {/* Customer Info Show */}
            <PaymentLinkCustomerInfoShow />

          </div>
        </div>
  );
}