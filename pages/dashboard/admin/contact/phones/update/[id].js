import styles from "../../../../../../styles/Dashboard/dashboard.module.css";
import {AxiosJwt} from "../../../../../../lib/axios";
import ContactPhoneInfoUpdate from "../../../../../../comps/admin/conatct/phones/ContactPhoneInfoUpdate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getContactPhone } from "../../../../../../store/slices/contactPhoneSlice";
import LoadingPage from "../../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../../comps/AlertError";
import { useRouter } from "next/router";

export default function UpdateContactPhone() {
    const { contact_phone, isLoading, api_errors } = useSelector((state) => state.contactPhone);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getContactPhone(id))
    }, [dispatch, id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !contact_phone && isLoading && <LoadingPage />
                }
                {
                    !contact_phone && api_errors && <ErrorPage />
                }
                {
                    contact_phone && <ContactPhoneInfoUpdate contactPhoneInfo={contact_phone} />
                }
            </div>
        </div>
    );
}

