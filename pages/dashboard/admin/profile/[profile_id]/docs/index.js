import styles from "../../../../../../styles/Dashboard/dashboard.module.css";
import NavProfile from "../../../../../../comps/Dashboard/Setting/NavProfile";
import ProfileInfoShow from "../../../../../../comps/admin/profiles/ProfileInfoShow";
import { getProfile } from "../../../../../../store/slices/profileSlice";
import { getLanguages } from "../../../../../../store/slices/languageSlice";
import { getBusinessCategories } from "../../../../../../store/slices/businessCategorySlice";
import { getInvoicesExpiry } from "../../../../../../store/slices/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import LoadingPage from "../../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../../comps/AlertError";
import { useEffect } from "react";
import AdminProfileDetails from "../../../../../../comps/Dashboard/EditProfile/AdminProfileDetails";
import { getDepositsTerms } from "../../../../../../store/slices/depositSlice";
import AdminShowDocs from "../../../../../../comps/Dashboard/EditProfile/AdminShowDocs";
import {
  getAdminDocuments,
  getDocuments,
} from "../../../../../../store/slices/documentSlice";

export default function ProfileDocs() {
  const { profile, isLoading, api_errors } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { profile_id } = router.query;

  useEffect(() => {
    profile_id && dispatch(getAdminDocuments({ profile_id }));
  }, [dispatch, profile_id]);

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {!profile && isLoading && <LoadingPage />}
        {!profile && api_errors && <ErrorPage />}
        {profile && (
          <>
            <NavProfile />
            {/* <AdminProfileDetails profile_business={profile} /> */}
            <AdminShowDocs />
          </>
        )}
      </div>
    </div>
  );
}
