import styles from "../../../../styles/Dashboard/dashboard.module.css";
import NavSetting from "../../../../comps/Dashboard/Setting/NavSetting";
import SearchManageUsers from "../../../../comps/Dashboard/Setting/SearchManageUsers";
import ManageUsers from "../../../../comps/Dashboard/Setting/ManageUsers";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getManageUsers } from "../../../../store/slices/manageUserSlice";

export default function ManageUsersPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getManageUsers());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {/* Nav Setting */}
                <NavSetting />

                {/* Manage Users Invoices */}
                <SearchManageUsers />

                {/* Manage Users */}
                <ManageUsers />
            </div>
        </div>
    );
}