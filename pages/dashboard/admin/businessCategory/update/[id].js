import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import {AxiosJwt} from "../../../../../lib/axios";
import BusinessCategoryInfoUpdate from "../../../../../comps/admin/businessCategory/BusinessCategoryInfoUpdate";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessCategories, getBusinessCategory } from "../../../../../store/slices/businessCategorySlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";

export default function UpdateBusinessCategory() {

    const { business_category, isLoading, api_errors } = useSelector((state) => state.businessCategory);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getBusinessCategory(id))
    }, [dispatch, id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !business_category && isLoading && <LoadingPage />
                }
                {
                    !business_category && api_errors && <ErrorPage />
                }
                {
                    business_category && <BusinessCategoryInfoUpdate businessCategoryInfo={business_category} />
                }
            </div>
        </div>
    );
}
