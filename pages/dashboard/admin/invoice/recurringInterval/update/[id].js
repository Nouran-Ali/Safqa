import styles from "../../../../../../styles/Dashboard/dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getRecurringInterval } from "../../../../../../store/slices/recurringIntervalSlice";
import LoadingPage from "../../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../../comps/AlertError";
import RecurringIntervalInfoUpdate from "../../../../../../comps/admin/recurringInterval/RecurringIntervalInfoUpdate";

export default function UpdateRecurringInterval() {
    const { recurring_interval, isLoading, api_errors } = useSelector((state) => state.recurringInterval);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getRecurringInterval(id))
    }, [dispatch, id])
    
    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !recurring_interval && isLoading && <LoadingPage />
                }
                {
                    !recurring_interval && api_errors && <ErrorPage />
                }
                {
                    recurring_interval && <RecurringIntervalInfoUpdate recurringIntervalInfo={recurring_interval} />
                }
            </div>
        </div>
    );
}
