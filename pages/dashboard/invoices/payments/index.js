import styles from "../../../../styles/Dashboard/dashboard.module.css";
import NavInvoices from "../../../../comps/Dashboard/Invoices/NavInvoices";
import Payments from "../../../../comps/Dashboard/Invoices/Payments";
import SearchPaymentLinks from "../../../../comps/Dashboard/Invoices/SearchPaymentLinks";
import { useEffect } from "react";
import { getPayments } from "../../../../store/slices/paymentLinkSlice";
import { useDispatch } from "react-redux";

export default function PaymentLinks() {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getPayments()) }, [])
    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {/* Nav edit profile buttons */}
                <NavInvoices />

                {/* Search Payments */}
                {/* <SearchPaymentLinks /> */}

                {/* Payments */}
                <Payments />
            </div>
        </div>
    );
}

