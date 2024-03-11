import BusinessTypeInfoComp from "../../../../comps/admin/BusinessType/BusinessTypeInfoComp";
import styles from "../../../../styles/Dashboard/dashboard.module.css";

export default function CreateNewBusinessType() {
    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <BusinessTypeInfoComp />
            </div>
        </div>
    );
}
