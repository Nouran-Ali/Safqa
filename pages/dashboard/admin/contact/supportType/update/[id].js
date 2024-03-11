import styles from "../../../../../../styles/Dashboard/dashboard.module.css";
import {AxiosJwt} from "../../../../../../lib/axios";
import SupportTypeInfoUpdate from "../../../../../../comps/admin/conatct/supportType/SupportTypeInfoUpdate";
import { useDispatch, useSelector } from "react-redux";
import { getSupportType, getSupportTypes } from "../../../../../../store/slices/supportTypeSlice";
import { useEffect } from "react";
import LoadingPage from "../../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../../comps/AlertError";
import { useRouter } from "next/router";

export default function UpdateSupportType() {
    const { support_type, isLoading, api_errors } = useSelector((state) => state.supportType);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getSupportType(id))
    }, [dispatch, id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>

                {
                    !support_type && isLoading && <LoadingPage />
                }
                {
                    !support_type && api_errors && <ErrorPage />
                }
                {
                    support_type && <SupportTypeInfoUpdate supportTypeInfo={support_type} />
                }
            </div>
        </div>
    );
}
