// import Image from "next/image";
// import Link from "next/link";
// import { i18n } from '../../comps/i18n';
import styles from "../../styles/Dashboard/dashboard.module.css";
import TitleSummary from "../../comps/Dashboard/TitleSummary";
import CompanyInformationandDetailsTaxInvoices from "../../comps/Dashboard/CompanyInformationandDetailsTaxInvoices";

export default function SummaryOfMonthlyTaxInvoices() {
  return (
    <div className="container mt-5">
      <TitleSummary />

      <CompanyInformationandDetailsTaxInvoices />
    </div>
  );
}