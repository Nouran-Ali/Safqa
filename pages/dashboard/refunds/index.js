import styles from "../../../styles/Dashboard/dashboard.module.css";
import SearchProducts from "../../../comps/Dashboard/Products/SearchProducts";
import Refunds from "../../../comps/Dashboard/Products/Refunds";
import { getRefunds } from "../../../store/slices/refundSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function RefundsPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRefunds());
    }, [dispatch])

    return (

        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {/* Refunds */}
                <Refunds />
            </div>
        </div>
    );
}

