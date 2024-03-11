import styles from "../../../../../../styles/Dashboard/dashboard.module.css";
import AdminAccounts from "../../../../../../comps/Dashboard/AccountStatement/AdminAccounts";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAdminAccountStatments } from "../../../../../../store/slices/accountStatmentSlice";
import { useRouter } from "next/router";
import NavProfile from "../../../../../../comps/Dashboard/Setting/NavProfile";

export default function AdminAccountStatement() {
    const dispatch = useDispatch()
    const router = useRouter();
    const { profile_id } = router.query;

    useEffect(() => {
        dispatch(getAdminAccountStatments(profile_id))
    }, [dispatch, profile_id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <NavProfile />
                <AdminAccounts />
            </div>
        </div>
    );
}

