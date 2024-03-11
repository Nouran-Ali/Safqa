import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import {AxiosJwt} from "../../../../../lib/axios";
import PaymentMethodInfoUpdate from "../../../../../comps/admin/paymentMethod/PaymentMethodInfoUpdate";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentMethod, getPaymentMethods } from "../../../../../store/slices/paymentMethodSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";

export default function UpdatePaymentMethod() {
    const { payment_method, isLoading, api_errors } = useSelector((state) => state.paymentMethod);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getPaymentMethod(id))
    }, [dispatch, id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !payment_method && isLoading && <LoadingPage />
                }
                {
                    !payment_method && api_errors && <ErrorPage />
                }
                {
                    payment_method && <PaymentMethodInfoUpdate paymentMethodInfo={payment_method} />
                }
            </div>
        </div>
    );
}

