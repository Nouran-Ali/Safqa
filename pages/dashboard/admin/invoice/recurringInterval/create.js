import RecurringIntervalInfoCreate from "../../../../../comps/admin/recurringInterval/RecurringIntervalInfoCreate";
import styles from "../../../../../styles/Dashboard/dashboard.module.css";

export default function CreateNewRecurringInterval() {
    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <RecurringIntervalInfoCreate />
            </div>
        </div>
    );
}
