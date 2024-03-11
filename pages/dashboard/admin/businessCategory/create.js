import styles from "../../../../styles/Dashboard/dashboard.module.css";
import BusinessCategoryInfo from "../../../../comps/admin/businessCategory/BusinessCategoryInfo";
import { getBusinessCategories } from "../../../../store/slices/businessCategorySlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function CreateNewBusinessCategory() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBusinessCategories());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <BusinessCategoryInfo />
            </div>
        </div>
    );
}
