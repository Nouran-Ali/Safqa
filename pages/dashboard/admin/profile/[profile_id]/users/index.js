import styles from "../../../../../../styles/Dashboard/dashboard.module.css";
import NavSetting from "../../../../../../comps/Dashboard/Setting/NavSetting";
import SearchManageUsers from "../../../../../../comps/Dashboard/Setting/SearchManageUsers";
import ManageUsers from "../../../../../../comps/Dashboard/Setting/ManageUsers";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getManageUsers } from "../../../../../../store/slices/manageUserSlice";
import NavProfile from "../../../../../../comps/Dashboard/Setting/NavProfile";
import { useRouter } from "next/router";
import AdminManageUsers from "../../../../../../comps/Dashboard/Setting/AdminManageUsers";

export default function AdminManageUsersPage() {
    const dispatch = useDispatch()
    const router = useRouter();
    const { profile_id } = router.query;

    useEffect(() => {
        profile_id && dispatch(getManageUsers(profile_id));
    }, [dispatch, profile_id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <NavProfile />

                {/* Manage Users Invoices */}
                <SearchManageUsers />

                {/* Manage Users */}
                {/* <ManageUsers /> */}
                <AdminManageUsers/>
            </div>
        </div>
    );
}