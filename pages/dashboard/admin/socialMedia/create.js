import styles from "../../../../styles/Dashboard/dashboard.module.css";
import SocialMediaInfo from "../../../../comps/admin/SocialMedia/SocialMediaInfo";

export default function CreateNewCountry() {
    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <SocialMediaInfo />
            </div>
        </div>
    );
}
