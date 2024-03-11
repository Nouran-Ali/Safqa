import styles from "../../../../styles/Dashboard/dashboard.module.css";
import AdminBankInfo from "../../../../comps/admin/bank/AdminBankInfo";
import { useDispatch } from "react-redux";
import { getBanks } from "../../../../store/slices/bankSlice";
import { useEffect } from "react";
import { getCountries } from "../../../../store/slices/countrySlice";

export default function CreateNewBank() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBanks());
        dispatch(getCountries());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <AdminBankInfo />
            </div>
        </div>
    );
}
