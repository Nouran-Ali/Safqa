import styles from "../../../../styles/Dashboard/dashboard.module.css";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getInvoice } from "../../../../store/slices/invoiceSlice";
import ErrorPage from "../../../../comps/AlertError";
import LoadingPage from "../../../../comps/LoadingPage";
import CreateRefund from "../../../../comps/Dashboard/CreateRefund";
import { getRefundSummary } from "../../../../store/slices/refundSlice";
import { getProfilesBusiness } from "../../../../store/slices/profileBusinessSlice";

export default function CreateRefundPage() {
    const { invoice, isLoading, api_errors } = useSelector((state) => state.invoice);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getInvoice(id))
        // id && dispatch(getRefundSummary(id))
        // dispatch(getProfilesBusiness())
    }, [dispatch, id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !invoice && isLoading && <div className="vh-100"><LoadingPage /></div>
                }
                {
                    !invoice && api_errors && <ErrorPage />
                }
                {
                    invoice && <CreateRefund item={invoice} />

                }
            </div>
        </div>
    );
}