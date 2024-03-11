// import Image from "next/image";
// import Link from "next/link";
// import { i18n } from '../../comps/i18n';
import styles from "../../../styles/Dashboard/dashboard.module.css";
import APIDetails from "../../../comps/Dashboard/Payments/APIDetails";
import PaymentMethods from "../../../comps/Dashboard/Payments/PaymentMethods";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPaymentMethods } from "../../../store/slices/paymentMethodSlice";
import { getCommission } from "../../../store/slices/commissionSlice";
import ErrorPage from "../../../comps/AlertError";
import LoadingPage from "../../../comps/LoadingPage";

const CommissionComponent = () => {
  return <>
    {/* API Details */}
    <APIDetails />
    <PaymentMethods />
  </>
}

export default function Commissions() {
  const dispatch = useDispatch()
  const { payment_methods, isLoading, success, api_errors } = useSelector(state => state.paymentMethod)

  useEffect(() => {
    dispatch(getPaymentMethods());
    // dispatch(getCommission());
  }, [dispatch])

  return (
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
      <div className={styles.container}>
        {
          !payment_methods && isLoading && <div className="vh-100"><LoadingPage /></div>
        }
        {
          !payment_methods && api_errors && <ErrorPage />
        }
        {
          payment_methods && <CommissionComponent />
        }
      </div>
    </div>
  );
}
