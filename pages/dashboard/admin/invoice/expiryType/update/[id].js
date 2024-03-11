import styles from "../../../../../../styles/Dashboard/dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingPage from "../../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../../comps/AlertError";
import { getExpiryType } from "../../../../../../store/slices/expiryTypeSlice";
import ExpiryTypeInfoUpdate from "../../../../../../comps/admin/expiryType/ExpiryTypeInfoUpdate";

export default function UpdateExpiryType() {
    const { expiry_type, isLoading, api_errors } = useSelector((state) => state.expiryType);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getExpiryType(id))
    }, [dispatch, id])
    
    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !expiry_type && isLoading && <LoadingPage />
                }
                {
                    !expiry_type && api_errors && <ErrorPage />
                }
                {
                    expiry_type && <ExpiryTypeInfoUpdate expiryTypeInfo={expiry_type} />
                }
            </div>
        </div>
    );
}
