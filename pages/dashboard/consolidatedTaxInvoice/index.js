// import Image from "next/image";
// import Link from "next/link";
// import { i18n } from '../../comps/i18n';
import styles from "../../../styles/Dashboard/dashboard.module.css";
import ConsolidatedTaxInvoiceForm from "../../../comps/Dashboard/ConsolidatedTaxInvoice/ConsolidatedTaxInvoiceForm";

export default function ConsolidatedTaxInvoice() {
  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Consolidated Tax Invoice Form */}
        <ConsolidatedTaxInvoiceForm />
      </div>
    </div>
  );
}
