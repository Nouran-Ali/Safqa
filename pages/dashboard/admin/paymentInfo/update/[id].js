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
import AdminPaymentInfoUpdate from "../../../../../comps/admin/paymentInfo/AdminPaymentInfoUpdate";
import { getPaymentInformation } from "../../../../../store/slices/paymentInfoSlice";

export default function UpdatePaymentInformation() {
    const { paymentInfo, isLoading, api_errors } = useSelector(
      (state) => state.paymentInfo
    );
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
      dispatch(getPaymentInformation());
    }, [dispatch]);

    return (
      <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
        <div className={styles.container}>
          {!paymentInfo && isLoading && <LoadingPage />}
          {!paymentInfo && api_errors && <ErrorPage />}
          {paymentInfo && (
            <AdminPaymentInfoUpdate paymentInfo={paymentInfo[0]} />
          )}
        </div>
      </div>
    );
}

