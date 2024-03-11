import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import SupportTypeInfo from "../../../../../comps/admin/conatct/supportType/SupportTypeInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSupportTypes } from "../../../../../store/slices/supportTypeSlice";

export default function CreateNewSupportType() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSupportTypes());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <SupportTypeInfo />
            </div>
        </div>
    );
}
