import styles from "../../../../styles/Dashboard/dashboard.module.css";
import NavSetting from "../../../../comps/Dashboard/Setting/NavSetting";
import AddressesTable from "../../../../comps/Dashboard/Setting/AddressesTable";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAddresses } from "../../../../store/slices/addressSlice";

export default function Addresses() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAddresses());
    }, [dispatch])
    
    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {/* Nav Setting */}
                <NavSetting />

                {/* Addresses */}
                <AddressesTable />
            </div>
        </div>
    );
}