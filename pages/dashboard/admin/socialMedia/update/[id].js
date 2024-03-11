import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import SocialMediaInfoUpdate from "../../../../../comps/admin/SocialMedia/SocialMediaInfoUpdate";
import {AxiosJwt} from "../../../../../lib/axios";
import { getSocialMedia } from "../../../../../store/slices/socialMediaSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";

export default function UpdateSocialMedia() {

    const { social_media, isLoading, api_errors } = useSelector((state) => state.socialMedia);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getSocialMedia(id))
    }, [dispatch, id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !social_media && isLoading && <LoadingPage />
                }
                {
                    !social_media && api_errors && <ErrorPage />
                }
                {
                    social_media && <SocialMediaInfoUpdate socialMediaInfo={social_media} />
                }
            </div>
        </div>
    );
}

