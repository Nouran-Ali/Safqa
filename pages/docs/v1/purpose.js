import React from 'react'
import { LinkHierarchy, MainTitleNew } from '../../../comps/docs/v1/DocsV1Components';
import styles from "../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Purpose = () => {
    const [t, i18n] = useTranslation();
    const { language } = i18n;
    return (
        <>
            <div dir={language=="ar" ? "rtl" : "ltr"} className={`${styles.purpose}`}>
                <LinkHierarchy parent={t("docs.Overview.overview")} child={t("docs.Overview.Purpose.Purpose")} />
                <MainTitleNew title={t("docs.Overview.Purpose.Purpose")} />
                {/* <hr /> */}
                <div className='fs-5 text-dark mt-3'>
                    <p>{t("docs.Overview.Purpose.body1")}</p>
                    <p className='mt-2'>{t("docs.Overview.Purpose.body2")}</p>
                </div>
            </div>
        </>
    )
}

export default Purpose
