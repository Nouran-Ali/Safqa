import styles from "../../../../../styles/Dashboard/dashboard.module.css";
import {AxiosJwt} from "../../../../../lib/axios";
import LanguageInfoUpdate from "../../../../../comps/admin/language/LanguageInfoUpdate";
import { useDispatch, useSelector } from "react-redux";
import { getLanguage, getLanguages } from "../../../../../store/slices/languageSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingPage from "../../../../../comps/LoadingPage";
import ErrorPage from "../../../../../comps/AlertError";

export default function UpdateLanguage() {
    const { language, isLoading, api_errors } = useSelector((state) => state.language);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        id && dispatch(getLanguage(id))
    }, [dispatch, id])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                {
                    !language && isLoading && <LoadingPage />
                }
                {
                    !language && api_errors && <ErrorPage />
                }
                {
                    language && <LanguageInfoUpdate languageInfo={language} />
                }
            </div>
        </div>
    );
}
