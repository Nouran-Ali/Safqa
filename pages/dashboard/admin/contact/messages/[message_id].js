import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import {AxiosJwt} from "../../../../../lib/axios";
import MessageShow from "../../../../../comps/admin/conatct/messages/MessageShow";
import { getMessage } from "../../../../../store/slices/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";

export default function ShowAdminMessage() {
    const { message, isLoading, api_errors } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const router = useRouter();
    const { message_id } = router.query;

    useEffect(() => {
        message_id && dispatch(getMessage(message_id))
    }, [dispatch, message_id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !message && isLoading && <LoadingPage />
                }
                {
                    !message && api_errors && <ErrorPage />
                }
                {
                    message && <MessageShow message={message} />
                }
            </div>
        </div>
    );
}
