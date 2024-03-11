import styles from "../../../../styles/Dashboard/dashboard.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import NavAdminContacts from "../../../../comps/Dashboard/Setting/NavAdminContacts";
import ContactInfoUpdate from "../../../../comps/admin/conatct/ContactInfoUpdate";
import { getContacts } from "../../../../store/slices/contactSlice";
import { useEffect } from "react";

const AdminContact = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch])

    return (

        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  mb-5">
            <div className={styles.container}>
                <NavAdminContacts />
                <ContactInfoUpdate />
            </div>
        </div>
    );
};

export default AdminContact;
