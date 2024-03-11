import styles from "../../../../styles/Dashboard/dashboard.module.css";
import AdminAboutInfo from "../../../../comps/admin/about/AdminAboutInfo";

export default function CreateNewAbout() {
    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <AdminAboutInfo />
            </div>
        </div>
    );
}
