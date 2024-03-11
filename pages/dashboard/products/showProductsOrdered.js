// import Image from "next/image";
// import Link from "next/link";
// import { i18n } from '../../comps/i18n';
import styles from "../../../styles/Dashboard/dashboard.module.css";
import OrderInfo from "../../../comps/Dashboard/Products/ShowProductsOrdered/OrderInfo";
import CustomerInfo from "../../../comps/Dashboard/Products/ShowProductsOrdered/CustomerInfo";
import PaymentInformationDetails from "../../../comps/Dashboard/Products/ShowProductsOrdered/PaymentInformationDetails";
import OrderItems from "../../../comps/Dashboard/Products/ShowProductsOrdered/OrderItems";
import OrderTransactions from "../../../comps/Dashboard/Products/ShowProductsOrdered/OrderTransactions";

export default function showProductsOrdered() {
  return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
          <div className={styles.container}>
            {/* Order Info Show */}
            <OrderInfo />

            {/* Customer Info Show */}
            <CustomerInfo/>

            {/* Payment Information Details Show */}
            <PaymentInformationDetails/>

            {/* Order Items */}
            <OrderItems/>

            {/* Order Transactions */}
            <OrderTransactions/>
          </div>
        </div>
  );
}