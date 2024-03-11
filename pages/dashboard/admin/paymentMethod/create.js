import styles from "../../../../styles/Dashboard/dashboard.module.css";
import PaymentMethodInfo from "../../../../comps/admin/paymentMethod/PaymentMethodInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPaymentMethods } from "../../../../store/slices/paymentMethodSlice";

export default function CreateNewPaymentMethod() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPaymentMethods());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <PaymentMethodInfo />
            </div>
        </div>
    );
}
