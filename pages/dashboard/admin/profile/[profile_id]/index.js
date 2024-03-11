import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import NavProfile from "../../../../../comps/Dashboard/Setting/NavProfile";
import ProfileInfoShow from "../../../../../comps/admin/profiles/ProfileInfoShow";
import { getProfile } from "../../../../../store/slices/profileSlice";
import { getLanguages } from "../../../../../store/slices/languageSlice";
import { getBusinessCategories } from "../../../../../store/slices/businessCategorySlice";
import { getInvoicesExpiry } from "../../../../../store/slices/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";
import { useEffect, useState } from "react";
import AdminProfileDetails from "../../../../../comps/Dashboard/EditProfile/AdminProfileDetails";
import { getDepositsTerms } from "../../../../../store/slices/depositSlice";


export default function ProfileInfo() {

    const { profile, isLoading, api_errors } = useSelector((state) => state.profile);
    const { invoice_expiry } = useSelector(state => state.invoice);
    const { business_categories } = useSelector(state => state.businessCategory);
    const [isOk, setIsOk] = useState(false);


    const dispatch = useDispatch();
    const router = useRouter();
    const { profile_id } = router.query;

    useEffect(() => {
        profile_id && dispatch(getProfile(profile_id))
    }, [dispatch, profile_id])

    useEffect(() => {
        dispatch(getLanguages());
        dispatch(getBusinessCategories());
        dispatch(getInvoicesExpiry());
        dispatch(getDepositsTerms());
    }, [dispatch])

    useEffect(() => {
        if (invoice_expiry.length > 0 && business_categories.length > 0) {
            setIsOk(true)
        }
    }, [invoice_expiry, profile, business_categories])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <NavProfile />

                {
                    !profile && isLoading && <LoadingPage />
                }
                {
                    !profile && api_errors && <ErrorPage />
                }
                {
                    isOk && profile &&
                    <AdminProfileDetails profile_business={profile} />
                }
            </div>
        </div>
    );
}
