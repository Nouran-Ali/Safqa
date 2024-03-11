import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import {AxiosJwt} from "../../../../../lib/axios";
import BusinessTypeInfoUpdateComp from "../../../../../comps/admin/BusinessType/BusinessTypeInfoUpdateComp";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";
import { getBusinessType } from "../../../../../store/slices/businessTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function UpdateBusinessType() {
    const { business_type, isLoading, api_errors } = useSelector((state) => state.businessType);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getBusinessType(id))
    }, [dispatch, id])
    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !business_type && isLoading && <LoadingPage />
                }
                {
                    !business_type && api_errors && <ErrorPage />
                }
                {
                    business_type && <BusinessTypeInfoUpdateComp businessTypeInfo={business_type} />
                }
            </div>
        </div>
    );
}


