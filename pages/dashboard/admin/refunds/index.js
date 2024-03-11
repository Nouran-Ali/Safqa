import styles from "../../../../styles/Dashboard/dashboard.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AdminRefunds from "../../../../comps/Dashboard/Products/AdminRefunds";
import { getAdminRefunds } from "../../../../store/slices/refundSlice";

export default function RefundsPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAdminRefunds());
    }, [dispatch])

    return (

        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {/* Refunds */}
                <AdminRefunds />
            </div>
        </div>
    );
}

