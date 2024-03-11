import styles from "../../../../styles/Dashboard/dashboard.module.css";
import InvoiceType from "../../../../comps/Dashboard/Invoices/InvoiceType";
import PaymentLinkInfo from "../../../../comps/Dashboard/Invoices/PaymentLinkInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCountries } from "../../../../store/slices/countrySlice";

export default function CreatePaymentLink() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>

                {/* Invoice Type */}
                <InvoiceType />

                {/* PaymentLink Info */}
                <PaymentLinkInfo />
            </div>
        </div>
    );
}