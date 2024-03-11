import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import AddressTypeInfo from "../../../../../comps/admin/addressType/AddressTypeInfo";

export default function CreateNewAddressType() {
    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <AddressTypeInfo />
            </div>
        </div>
    );
}
