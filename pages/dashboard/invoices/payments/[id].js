import styles from "../../../../styles/Dashboard/dashboard.module.css";
import InvoicesViewsShow from "../../../../comps/Dashboard/Invoices/InvoicesViewsShow";
import LoadingPage from "../../../../comps/LoadingPage";
import ErrorPage from "../../../../comps/AlertError";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getPayment } from "../../../../store/slices/paymentLinkSlice";
import PaymentLinksShow from "../../../../comps/Dashboard/Invoices/PaymentLinksShow";
import PaymentLinkCustomerInfoShow from "../../../../comps/Dashboard/Invoices/PaymentLinkCustomerInfoShow";
import InvoiceTransactionsShow from "../../../../comps/Dashboard/Invoices/InvoiceTransactionsShow";

export default function ShowPaymentLink() {
    const { payment, isLoading, api_errors } = useSelector((state) => state.paymentLink);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getPayment(id))
    }, [dispatch, id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !payment && isLoading && <LoadingPage />
                }
                {
                    !payment && api_errors && <ErrorPage />
                }
                {
                    payment && <>
                        <PaymentLinksShow payment={payment} />
                        {/* Invoices Views */}
                        <InvoicesViewsShow invoice={payment} />

                        {/* Invoice Transactions */}
                        <InvoiceTransactionsShow invoice={payment} />
                    </>
                }
            </div>
        </div>
    );
}
