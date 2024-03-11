import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import {AxiosJwt} from "../../../../../lib/axios";
import AdminAboutInfoUpdate from "../../../../../comps/admin/about/AdminAboutInfoUpdate";
import { getAbout } from "../../../../../store/slices/aboutSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";

export default function UpdateAdminAbout() {

    const { about, isLoading, api_errors } = useSelector((state) => state.about);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getAbout(id))
    }, [dispatch, id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !about && isLoading && <LoadingPage />
                }
                {
                    !about && api_errors && <ErrorPage/>
                }
                {
                    about && <AdminAboutInfoUpdate aboutInfo={about} />
                }
            </div>
        </div>
    );
}

