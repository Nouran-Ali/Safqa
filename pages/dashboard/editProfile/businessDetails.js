import styles from "../../../styles/Dashboard/dashboard.module.css";
import BusinessDetailsComp from "../../../comps/Dashboard/EditProfile/BusinessDetails";
import NavEditProfile from "../../../comps/Dashboard/EditProfile/NavEditProfile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLanguages } from "../../../store/slices/languageSlice";
import { getBusinessCategories } from "../../../store/slices/businessCategorySlice";
import { getProfilesBusiness } from "../../../store/slices/profileBusinessSlice";
import { getInvoicesExpiry } from "../../../store/slices/invoiceSlice";
import { getDeposits } from "../../../store/slices/depositSlice";
import ErrorPage from "../../../comps/AlertError";
import LoadingPage from "../../../comps/LoadingPage";

export default function BusinessDetails() {
  const dispatch = useDispatch()
  const { profile_business, isLoading, api_errors, success } = useSelector(state => state.profileBusiness);
  const { invoice_expiry } = useSelector(state => state.invoice);
  const { business_categories } = useSelector(state => state.businessCategory);
  const [isOk, setIsOk] = useState(false);


  useEffect(() => {
    dispatch(getLanguages());
    dispatch(getBusinessCategories());
    dispatch(getProfilesBusiness());
    dispatch(getInvoicesExpiry());
  }, [dispatch])

  useEffect(() => {
    if (invoice_expiry.length > 0 && business_categories.length > 0) {
      setIsOk(true)
    }
  }, [invoice_expiry, profile_business, business_categories])

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Nav edit profile buttons */}
        <NavEditProfile />

        {/* Business Details */}
        {
          !profile_business && isLoading && <div className="vh-100"><LoadingPage /></div>
        }
        {
          !profile_business && api_errors && <ErrorPage />
        }
        {
          isOk && profile_business &&
          <BusinessDetailsComp profile_business={profile_business} />
        }
      </div>
    </div>
  );
}
