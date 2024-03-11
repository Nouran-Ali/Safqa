import styles from "../../../../styles/Dashboard/dashboard.module.css";
import LanguageInfo from "../../../../comps/admin/language/LanguageInfo";
import { useDispatch } from "react-redux";
import { getLanguages } from "../../../../store/slices/languageSlice";
import { useEffect } from "react";

export default function CreateNewLanguage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLanguages());
    }, [dispatch])

    return (
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
            <div className={styles.container}>
                <LanguageInfo />
            </div>
        </div>
    );
}
