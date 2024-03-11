import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import ContactPhoneInfo from "../../../../../comps/admin/conatct/phones/ContactPhoneInfo";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getContactPhones } from "../../../../../store/slices/contactPhoneSlice";

export default function CreateNewContactPhone() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getContactPhones())
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <ContactPhoneInfo />
            </div>
        </div>
    );
}
