import styles from "../../../../styles/Dashboard/dashboard.module.css";
import CategoryInfo from "../../../../comps/Dashboard/Products/CategoryInfo";

export default function createNewCategory() {
    return (
        <div className="invoices container-xxl">
            <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                    {/* menu */}

                </div>
                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
                    <div className={styles.container}>
                        {/* Category Info */}
                        <CategoryInfo />
                    </div>
                </div>
            </div>
        </div>
    );
}
