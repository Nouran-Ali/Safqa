import styles from "../../../../styles/Dashboard/dashboard.module.css";
import NavSetting from "../../../../comps/Dashboard/Setting/NavSetting";
import NavIntegration from "../../../../comps/Dashboard/Setting/NavIntegration";
import WebhookSetting from "../../../../comps/Dashboard/Setting/WebhookSetting";

export default function Integration() {
    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {/* Nav Setting */}
                <NavSetting />

                <NavIntegration />

                <WebhookSetting />
            </div>
        </div>
    );
}
