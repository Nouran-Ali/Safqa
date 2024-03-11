import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import {AxiosJwt} from "../../../../../lib/axios";
import PaymentMethodInfoUpdate from "../../../../../comps/admin/paymentMethod/PaymentMethodInfoUpdate";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentMethod, getPaymentMethods } from "../../../../../store/slices/paymentMethodSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";
import AdminCommissionInfoUpdate from "../../../../../comps/admin/adminCommission/AdminCommissionInfoUpdate";
import { getAdminCommissions } from "../../../../../store/slices/adminCommissionSlice";

export default function UpdatePaymentMethod() {
    const { adminCommissions, isLoading, api_errors } = useSelector((state) => state.adminCommission);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
      dispatch(getAdminCommissions());
    }, [dispatch]);

    return (
      <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
        <div className={styles.container}>
          {!adminCommissions && isLoading && <LoadingPage />}
          {!adminCommissions && api_errors && <ErrorPage />}
          {adminCommissions && (
            <AdminCommissionInfoUpdate adminCommission={adminCommissions[0]} />
          )}
        </div>
      </div>
    );
}

