import styles from "../../../styles/Dashboard/dashboard.module.css";
import NavEditProfile from "../../../comps/Dashboard/EditProfile/NavEditProfile";
import BankDetailsComp from "./../../../comps/Dashboard/EditProfile/BankDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfilesBusiness } from "../../../store/slices/profileBusinessSlice";
import ErrorPage from "../../../comps/AlertError";
import LoadingPage from "../../../comps/LoadingPage";

export default function BankDetails() {
  const { profile_business, isLoading, api_errors, success } = useSelector(state => state.profileBusiness);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfilesBusiness());
  }, [dispatch])

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {/* Nav edit profile buttons */}
        <NavEditProfile />

        {
          !profile_business && isLoading && <div className="vh-100"><LoadingPage /></div>
        }
        {
          !profile_business && api_errors && <ErrorPage />
        }
        {
          profile_business && <BankDetailsComp />
        }
        {/* Bank Details */}
      </div>
    </div>
  );
}

