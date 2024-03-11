// import { i18n } from '../../comps/i18n';
import styles from "../../../styles/Dashboard/dashboard.module.css";
import CustomerInfoShow from "../../../comps/Dashboard/Invoices/CustomerInfoShow";
import InvoiceInfoShow from "../../../comps/Dashboard/Invoices/InvoiceInfoShow";
import InvoiceItemsShow from "../../../comps/Dashboard/Invoices/InvoiceItemsShow";
import InvoicesViewsShow from "../../../comps/Dashboard/Invoices/InvoicesViewsShow";
import InvoiceTransactionsShow from "../../../comps/Dashboard/Invoices/InvoiceTransactionsShow";
import InvoiceDesign from "../../../comps/Dashboard/InvoiceDesign";
import PaymentLinkDesign from "../../../comps/Dashboard/PaymentLinkDesign";
import {AxiosJwt} from "../../../lib/axios";
import LoadingPage from "../../../comps/LoadingPage";
import ErrorPage from "../../../comps/AlertError";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getInvoice } from "../../../store/slices/invoiceSlice";
import { useEffect } from "react";
import { getProfilesBusiness } from "../../../store/slices/profileBusinessSlice";

export default function ShowInvoices() {
    const { invoice, isLoading, api_errors } = useSelector((state) => state.invoice);
    const dispatch = useDispatch();
    const router = useRouter();
    
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getInvoice(id))
        // dispatch(getProfilesBusiness())
    }, [dispatch, id])


    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !invoice && isLoading && <LoadingPage />
                }
                {
                    !invoice && api_errors && <ErrorPage />
                }
                {
                    invoice && <>
                        {/* Customer Info Show */}
                        <CustomerInfoShow invoice={invoice} />

                        {/* Invoice Info Show */}
                        <InvoiceInfoShow invoice={invoice} />

                        {/* Invoice Items Show */}
                        <InvoiceItemsShow invoice={invoice} />

                        {/* Invoices Views */}
                        <InvoicesViewsShow invoice={invoice} />

                        {/* Invoice Transactions */}
                        <InvoiceTransactionsShow invoice={invoice} />
                    </>
                }
            </div>
        </div>
    );
}
