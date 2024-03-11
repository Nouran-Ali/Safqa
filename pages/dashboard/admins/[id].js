// import Image from "next/image";
// import Link from "next/link";
// import { i18n } from '../../comps/i18n';
import styles from "../../../styles/Dashboard/dashboard.module.css";
import ProductInfoShow from "../../../comps/Dashboard/Products/ProductInfoShow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingPage from "../../../comps/LoadingPage";
import ErrorPage from "../../../comps/AlertError";
import { getAdmin } from "../../../store/slices/adminSlice";
import AdminShow from "../../../comps/admin/admins/AdminShow";
import ShowAdminRoles from "../../../comps/Dashboard/Setting/ShowAdminRoles ";

export default function ShowAdmin() {

  const { admin, isLoading, api_errors } = useSelector((state) => state.admin);
  console.log("🚀 ~ file: [id].js:18 ~ ShowAdmin ~ admin:", admin)
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    id && dispatch(getAdmin(id))
  }, [dispatch, id])


  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {
          !admin && isLoading && <LoadingPage />
        }
        {
          !admin && api_errors && <ErrorPage />
        }
        {
          admin &&
          <>
            <AdminShow admin={admin} />
            <ShowAdminRoles userInfo={admin} />
          </>
        }
      </div>
    </div>
  );
}

