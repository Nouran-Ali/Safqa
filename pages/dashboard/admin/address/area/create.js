import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import AreaInfo from "../../../../../comps/admin/area/AreaInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCities } from "../../../../../store/slices/citySlice";

export default function CreateNewArea() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCities());
    }, [dispatch])
    
    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <AreaInfo />
            </div>
        </div>
    );
}
